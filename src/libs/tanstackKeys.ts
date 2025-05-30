const createTanstackKeys = <T extends { [K in keyof T]: K }>(keyObj: T) =>
	keyObj;

/**
 * TanStack Query で使用する queryKey の一覧。
 *
 * 各キーとその値は同じ文字列である必要があり、キーの重複やミスを防ぐために
 * 型レベルで一意性が保証される。
 *
 * このオブジェクトは `createTanstackKeys` を使って定義され、
 * IDE 補完と型チェックを強力にサポート。
 *
 * @example
 * tanstackKeys.homeSwiper // 'homeSwiper'
 *
 * @remarks
 * queryKey を直接文字列で書く代わりに、ここから import して使うことで
 * 保守性が向上し、重複やスペルミスを防ぐ。
 */

export const tanstackKeys = createTanstackKeys({
	githubFileTree: 'githubFileTree',
});
