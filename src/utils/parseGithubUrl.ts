import type { ParseGithubUrlReturns } from '@/interfaces';

/**
 * GitHubのURLをパースして、owner、repo、ブランチ名 (ref)、パスを抽出する関数。
 *
 * 対応しているURL形式の例：
 * - https://github.com/owner/repo
 * - https://github.com/owner/repo/tree/branch
 * - https://github.com/owner/repo/blob/branch/path/to/file
 *
 * @param {string} raw GitHubのリポジトリURL (http もしくは https)
 * @returns {ParseGithubUrlReturns | undefined}
 *          - owner: リポジトリ所有者のユーザー名
 *          - repo: リポジトリ名
 *          - ref: ブランチ名またはコミットSHA (指定がなければundefined)
 *          - path: ブランチ以降のファイルやフォルダのパス (指定がなければundefined)
 *          - URL形式が不正な場合はundefinedを返す
 */
export const parseGithubUrl = (
	raw: string,
): ParseGithubUrlReturns | undefined => {
	// とりあえず http, https どちらでも通すことに (s の有無を許容)
	const m =
		/^https?:\/\/github\.com\/([^/]+)\/([^/]+)(?:\/(?:tree|blob)\/[^/]+(?:\/(.*))?)?$/.exec(
			raw,
		);
	if (!m) return undefined;

	// Github URL の形式が正しければ owner と repo に関しては必ず存在する模様

	// 例えば URL 形式が https://github.com/owner/repo (ルートディレクトリを見ている) などの場合、
	// ref (ブランチ情報) が含まれない。
	// path も同様に URL の長さによっては含まれないこともある。
	const owner = m[1];
	const repo = m[2];
	const path = m[3] ? decodeURIComponent(m[3]) : undefined;

	return { owner: owner, repo: repo, path: path };
};
