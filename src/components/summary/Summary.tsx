import type React from 'react';

interface SummaryProps {
	text: string;
}

// summary　→　要約

const Summary: React.FC<SummaryProps> = ({ text }) => {
	alert(text);

	return (
		<div>
			<h3>現時点ではテキスト要約をしてもらってます。</h3>
			<p>{text}</p>
		</div>
	);
};

export default Summary;
