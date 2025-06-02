import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MyMarkdownFieldProps = {
	markdown: string;
};

export const MyMarkdownField = ({ markdown }: MyMarkdownFieldProps) => {
	return (
		<>
			<div
				style={{
					border: '1px solid #ccc',
					borderRadius: '8px',
					padding: '1rem',
					// backgroundColor: "#f9f9f9"
				}}
			>
				<ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
			</div>
		</>
	);
};
