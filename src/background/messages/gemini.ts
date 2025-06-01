import * as process from 'node:process';
import type { MessageMetadata } from '@/interfaces';
import { GoogleGenAI } from '@google/genai';
import type { PlasmoMessaging } from '@plasmohq/messaging';

const api = process.env.PLASMO_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenAI({ apiKey: api });

const geminiFunction = async () => {
	try {
		console.log('geminiの関数が呼ばれていないの？');
		const model = await genAI.models.generateContent({
			model: 'gemini-1.5-flash',
			contents: 'おはようの説明して',
		});
		// const prompt = `「おはよう」という単語について詳しく説明してください。以下の内容を含めてください`;
		// const result = await model.generateContent(prompt);
		// const response = result.response;
		// const explanation = response.text();
		console.log(model.text);
		return model.text;
	} catch (error) {
		console.error('単語説明エラー:', error);
		return '';
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
	console.log('ハンドラーの関数が呼ばれていないの？');

	const result = await geminiFunction();
	if (result) {
		res.send(result);
	}
};

export default handler;
