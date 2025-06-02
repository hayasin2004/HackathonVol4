import type { TopPageLoadingMdProps } from '@/interfaces';
import { Box, CircularProgress, Typography } from '@mui/material';

export const TopPageLoadingMd = ({ url }: TopPageLoadingMdProps) => {
	return (
		<Box
			display='flex'
			justifyContent='center'
			alignItems='center'
			flexDirection='column'
			gap={5}
			width='100%'
			minHeight={200}
		>
			<Typography
				variant='body2'
				width='100%'
				sx={{
					wordBreak: 'break-all',
				}}
			>
				{`${url} のドキュメントを生成中...`}
			</Typography>
			<CircularProgress
				size={24}
				color='primary'
			/>
		</Box>
	);
};
