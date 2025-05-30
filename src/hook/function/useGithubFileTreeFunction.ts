import { axiosGet } from '@/libs';
import octokitClient from '@/libs/octokitClient';
import { parseGithubUrl } from '@/utils';

/**
 * GitHubリポジトリの指定URLからファイルツリーを再帰的に取得し、
 * ファイルのパスと中身をテキストでまとめて返すhook
 *
 * - URLはリポジトリのルート、特定のブランチ、特定のフォルダやファイルパスまで対応可能
 * - ref (ブランチやコミット指定) が無い (現在のURLから取得できなかった) 場合はリポジトリのデフォルトブランチを使用
 * - ファイルの中身はGitHubのダウンロードURLから直接テキスト取得
 *
 * @param {string} url - GitHubのリポジトリURL (例: https://github.com/owner/repo/tree/branch/path)
 * @returns {Promise<string>} ファイルパスと内容を整形した文字列。パスごとに区切りあり。
 *
 * @throws {Error} URLの解析に失敗した場合やAPI通信に問題があった場合はエラーを投げる可能性あり
 */
export const useGithubFileTreeFunction = async (url: string) => {
	// URL から必要な情報を抽出
	const parsed = parseGithubUrl(url);
	// URL が不正なら return
	if (!parsed) return '';
	let { owner, repo, ref, path } = parsed;

	// ref がなければリポジトリに設定されたデフォルトブランチを取得して補完
	if (!ref) {
		const res = await octokitClient.repos.get({ owner, repo });
		ref = res.data.default_branch;
	}

	// ディレクトリの場合は配列、ファイル単体の場合は単一オブジェクトなので配列に統一する
	const files: { path: string; content: string }[] = [];

	async function walk(currentPath: string) {
		const res = await octokitClient.repos.getContent({
			owner,
			repo,
			path: currentPath,
			ref,
		});
		const items = Array.isArray(res.data) ? res.data : [res.data];

		for (const item of items) {
			if (item.type === 'dir') {
				// ディレクトリなら再帰的に中身を調査
				await walk(item.path);
			} else if (item.type === 'file' && item.download_url) {
				// ファイルならダウンロードURLから内容をテキスト取得して files 配列に追加
				const content = await axiosGet<string>(item.download_url);
				files.push({ path: item.path, content });
			}
		}
	}

	// 例えば URL がルートブランチの時は URL にパス情報が含まれないので空文字にして走査
	// パスがないからと言って URL が不正であるわけではないので空文字を渡して走査する
	await walk(path ?? '');

	// 結果をファイル一覧の文字列に整形する
	const result = [`[${path || '/'}] (branch: ${ref})`, ''];
	for (const file of files) {
		result.push(file.path);
		result.push('-'.repeat(file.path.length));
		result.push(file.content);
		result.push(''); // 区切りの空行を挿入
	}

	return result.join('\n');
};
