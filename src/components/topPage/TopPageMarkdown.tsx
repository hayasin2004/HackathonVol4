import type { TopPageMarkdownProps } from '@/interfaces';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const TopPageMarkdown = ({ content }: TopPageMarkdownProps) => {
	const [typedContent, setTypedContent] = useState<string>('');

	useEffect(() => {
		setTypedContent('');
		let index = 0;

		const interval = setInterval(() => {
			setTypedContent((prev) => {
				if (index >= content.length) {
					clearInterval(interval);
					return prev;
				}
				const nextChar = content[index];
				index++;
				return prev + nextChar;
			});
		}, 3);

		return () => clearInterval(interval);
	}, [content]);

	return (
		<div style={{ width: '100%' }}>
			<ReactMarkdown remarkPlugins={[remarkGfm]}>
				{String(typedContent)}
			</ReactMarkdown>
		</div>
	);
};
