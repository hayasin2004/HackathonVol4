import type { MessageMetadata } from '@/interfaces';
import { sendToBackground } from '@plasmohq/messaging';

export const useGeminiBackground = () => {
	const handleGemini = async (content: string): Promise<string> => {
		const result = await sendToBackground<
			MessageMetadata['gemini']['req'],
			MessageMetadata['gemini']['res']
		>({
			name: 'gemini',
			body: { content },
		});
		console.log('result--->', result);
		return result;
	};

	return {
		handleGemini,
	};
};
