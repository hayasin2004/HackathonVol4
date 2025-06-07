// fixMarkdownContent
// markdownの「閉じ忘れ補正」　+ 「最終構文チェック」

import { micromark } from 'micromark';

export const fixMarkdownContent = (row: string): string => {
	let fixed = row;

	// ```の数が奇数なら閉じ忘れと判断
	// ```を末尾に追加
	// これがないと、Markdown構築時、最初の```が入力された時にエラーになります
	const backtickCount: number = (row.match(/```/g) || []).length;
	if (backtickCount % 2 === 1) {
		fixed += '\n```';
	}

	// micromarkで構文チェック
	try {
		micromark(fixed);
		return fixed;
	} catch (e) {
		console.error('Markdown構文エラー：', e);
		return `${fixed}\n\n Markdown構文にエラーがあります`;
	}
};
