import Summary from '@/components/summary/Summary';
import type { MessageMetadata } from '@/interfaces';
import { sendToBackground } from '@plasmohq/messaging';
import { useState } from 'react';

function IndexPopup() {
	const [explanation, setExplanation] = useState<string>('');
	// const [loading, setLoading] = useState<boolean>(false);

	const handleExplainWord = async () => {
		// setLoading(true);
		const handleGeminiFunction = async () => {
			console.log('発火');

			const result = await sendToBackground<
				MessageMetadata['gemini']['req'],
				MessageMetadata['gemini']['res']
			>({
				name: 'gemini',
				body: { contents: 'おはよう' },
			});
			setExplanation(result);
			return result;
		};
		await handleGeminiFunction();
		console.log('関数が呼び終わっているのか');
	};

	return (
		<div>
			<h2>「おはよう」の意味説fgsdht明</h2>
			<button
				type={'submit'}
				onClick={handleExplainWord}
			>
				これで生成してみよう
			</button>

			{/*<LoadingButton loading={loading} onClick={handleExplainWord} />*/}
			{explanation && <Summary text={explanation} />}
		</div>
	);
}

export default IndexPopup;
