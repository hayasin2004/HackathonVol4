import type { TopPageMarkdownProps } from '@/interfaces';
import { fixMarkdownContent } from '@/utils/fixMarkdownContent';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const TopPageMarkdown = ({ content }: TopPageMarkdownProps) => {
	const [typedContent, setTypedContent] = useState<string>('');
	const [fixedContent, setFixedContent] = useState<string>('');

	useEffect(() => {
		setTypedContent('');
		let index = 0;
		const fixed = fixMarkdownContent(content);
		setFixedContent(fixed);

		const interval = setInterval(() => {
			setTypedContent((prev) => {
				if (index >= fixed.length) {
					clearInterval(interval);
					return prev;
				}
				const nextChar = fixed[index];
				index++;
				return prev + nextChar;
			});
		}, 3);

		return () => clearInterval(interval);
	}, [content]);

	useEffect(() => {
		console.log('typedContent===>', typedContent);
	}, [typedContent]);

	// return (
	// 	<div style={{ width: '100%' }}>
	// 		<ReactMarkdown remarkPlugins={[remarkGfm]}>
	// 			{String(typedContent)}
	// 		</ReactMarkdown>
	// 	</div>
	// );
	return (
		<div style={{ width: '100%' }}>
			{typedContent === fixedContent ? (
				<ReactMarkdown remarkPlugins={[remarkGfm]}>
					{typedContent}
				</ReactMarkdown>
			) : (
				<pre style={{ whiteSpace: 'pre-wrap' }}>{typedContent}</pre>
			)}
		</div>
	);
};
