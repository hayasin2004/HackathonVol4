export function extraSafeMarkdown(md: string): [string, string] {
	const ticks = [...md.matchAll(/```/g)]
		.map((m) => m.index)
		.filter((i): i is number => i !== undefined);

	// 正常なコードブロックならすべて返す
	if (ticks.length % 2 === 0) {
		return [md, ''];
	}

	if (ticks.length >= 2) {
		const lastClosedIndex = ticks[ticks.length - 2];
		const safe = md.slice(0, lastClosedIndex + 3);
		const remainder = md.slice(lastClosedIndex + 3);

		// 余計なバッククォート（例：'`'や'"'）がくっついてないかを除去
		const cleanedRemainder = remainder.replace(/^`+/, '');

		return [safe, cleanedRemainder];
	}

	return ['', md];
}
