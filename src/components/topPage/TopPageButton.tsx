import type { TopPageButtonProps } from '@/interfaces';
import { Add, Close } from '@mui/icons-material';
import { Button } from '@mui/material';

export const TopPageButton = ({
	disabled,
	isGithubUrl,
	onClick,
}: TopPageButtonProps) => {
	return (
		<Button
			fullWidth
			variant='contained'
			disableTouchRipple
			disabled={disabled || !isGithubUrl}
			onClick={onClick}
			endIcon={isGithubUrl ? <Add /> : <Close />}
		>
			{isGithubUrl ? 'ドキュメントを生成する' : 'githubが検出されませんでした'}
		</Button>
	);
};
