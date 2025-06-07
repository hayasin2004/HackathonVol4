import type { TopPageMarkdownProps } from '@/interfaces';
import { extraSafeMarkdown } from '@/utils/extractSafeMarkdown';
import { fixMarkdownContent } from '@/utils/fixMarkdownContent';
import hljs from 'highlight.js';
import Markdown from 'markdown-to-jsx';
import { micromark } from 'micromark';
import { useEffect, useState } from 'react';
import 'highlight.js/styles/github.css';
import DOMPurify from 'dompurify';

// typedContentが進行中 → 安全な部分だけpreviewへ
// 「今はまだ火らっきぱなしのコードや強調」 → reainderへ
export const TopPageMarkdown = ({ content }: TopPageMarkdownProps) => {
	const [typedContent, setTypedContent] = useState<string>('');
	const [safeMd, setSafeMd] = useState('');
	const [remainder, setRemainder] = useState('');

	useEffect(() => {
		console.log('contentの中身--->', content);
	}, [content]);

	useEffect(() => {
		const fixed = fixMarkdownContent(content);
		setTypedContent('');
		let index = 0;

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
		}, 1);

		return () => clearInterval(interval);
	}, [content]);

	useEffect(() => {
		const [md, rem] = extraSafeMarkdown(typedContent);
		console.log('typedContent===>', typedContent);
		console.log(' safeMd =>', md);
		console.log(' remainder =>', rem);
	}, [typedContent]);

	useEffect(() => {
		const result = extraSafeMarkdown(typedContent);
		if (!Array.isArray(result) || typeof result[0] !== 'string') {
			console.warn('⚠️ extraSafeMarkdown returned unexpected result:', result);
			return;
		}

		const [md, rem] = result;
		const fixedMd = fixMarkdownContent(md);
		// console.log('remainder ===>', remainder);

		if (rem === '' && fixedMd.length > safeMd.length) {
			setSafeMd(fixedMd);
			setRemainder('');
		} else {
			setSafeMd(fixedMd);
			setRemainder(rem);
		}
	}, [typedContent, safeMd.length]);

	useEffect(() => {
		const [md] = extraSafeMarkdown(typedContent);

		try {
			micromark(md); // micromarkでパース可能かチェック
			console.log(' safeMd is parsable');
		} catch (err) {
			console.warn(' safeMd parse failed:', err);
		}
	}, [typedContent]);

	return (
		<div style={{ width: '100%' }}>
			{safeMd && (
				<Markdown
					options={{
						overrides: {
							// <pre><code> で囲まれてる場合だけ highlight を適用
							pre: {
								component: ({
									children,
								}: {
									children: React.ReactElement<{
										className?: string;
										children: string;
									}>;
								}) => {
									const child = children?.props?.children;
									const langClass = children?.props?.className || '';
									const language =
										langClass.replace('lang-', '') || 'plaintext';

									let highlighted = '';
									try {
										highlighted = hljs.highlight(child, { language }).value;
									} catch {
										highlighted = hljs.highlightAuto(child).value;
									}

									return (
										<pre
											style={{
												backgroundColor: '#f9f9f9',
												padding: '1em',
												borderRadius: '5px',
												overflowX: 'auto',
											}}
										>
											<code
												className='hljs'
												style={{
													fontFamily: 'monospace',
													fontSize: '0.95em',
													backgroundColor: 'transparent',
												}}
												// biome-ignore lint/security/noDangerouslySetInnerHtml: highlight済コードを安全に埋め込み
												dangerouslySetInnerHTML={{
													__html: DOMPurify.sanitize(highlighted),
												}}
											/>
										</pre>
									);
								},
							},
							code: {
								// インラインコードには highlight 適用しない（見出し中の `code` に影響しない）
								component: ({ children }: { children?: React.ReactNode }) => (
									<code
										className='hljs'
										style={{
											backgroundColor: '#F9F9F9',
											padding: '0.2em 0.4em',
											borderRadius: '3px',
											fontSize: '0.9em',
										}}
									>
										{children}
									</code>
								),
							},
							h2: {
								component: ({ children }: { children?: React.ReactNode }) => (
									<h2>{children}</h2>
								),
							},
						},
					}}
				>
					{safeMd}
				</Markdown>
			)}

			{remainder && (
				<pre
					style={{
						whiteSpace: 'pre-wrap',
						margin: 0,
						// color: '#999',
						borderTop: '1px dashed #ccc',
						paddingTop: '1rem',
					}}
				>
					{/* プレーンテキストとして表示（Markdown解釈はしない） */}
					<code>{remainder}</code>
				</pre>
			)}
		</div>
	);
};
