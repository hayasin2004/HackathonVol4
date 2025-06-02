import type { MessageMetadata } from '@/interfaces';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { PlasmoMessaging } from '@plasmohq/messaging';

/**
 * Gemini に文字列を渡して返答を取得する関数
 * @param content ユーザーの入力内容
 * @returns Gemini からの返答テキスト
 */
const generateGeminiAnswer = async (content: string): Promise<string> => {
	const apiKey = process.env.PLASMO_PUBLIC_GEMINI_API_KEY;
	if (!apiKey) throw new Error('Google API Key is not set.');

	const genAI = new GoogleGenerativeAI(apiKey);
	const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

	try {
		const result = await model.generateContent(content);
		const response = result.response;
		return response.text();
	} catch (error) {
		console.error('Gemini Error:', error);
		return 'エラーが発生しました。';
	}
};

const handler: PlasmoMessaging.MessageHandler<
	MessageMetadata['gemini']['req'],
	MessageMetadata['gemini']['res']
> = async (req, res) => {
	if (!req.body) {
		res.send('No body provided');
		return;
	}
	const { content } = req.body;
	const result = await generateGeminiAnswer(content);
	res.send(result);
};

export default handler;
