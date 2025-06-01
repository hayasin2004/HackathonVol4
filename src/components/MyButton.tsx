import { Button } from '@mui/material';

type Props = {
	onClick: () => void;
	disabled: boolean;
};

export const MyButton = ({ onClick, disabled }: Props) => {
	return (
		<Button
			variant='outlined'
			onClick={onClick}
			disabled={disabled}
		>
			生成
		</Button>
	);
};
