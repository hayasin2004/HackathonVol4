import type { TopPageCopyButtonProps } from '@/interfaces';
import { ContentCopy } from '@mui/icons-material';
import { Button } from '@mui/material';

export const TopPageCopyButton = ({ copytext }: TopPageCopyButtonProps) => {
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(copytext);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Button
			variant='outlined'
			fullWidth
			onClick={handleCopy}
			endIcon={<ContentCopy />}
		>
			コピーする
		</Button>
	);
};
