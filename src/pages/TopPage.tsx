import { useGithubFileTreeBackground } from '@/hooks';
import { getActiveTabUrl } from '@/utils';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';

export const TopPage = () => {
	const [url, setUrl] = useState<string | null>(null);

	useEffect(() => {
		getActiveTabUrl().then(setUrl);
	}, []);
	console.log(url);

	const { data, isFetched, refetch } = useGithubFileTreeBackground(url ?? '');
	console.log(data);

	const handleClick = async () => {
		const currentUrl = await getActiveTabUrl();
		setUrl(currentUrl);
		if (!isFetched) {
			refetch();
		} else {
			console.log('キャッシュを使用中:', data);
		}
	};
	return (
		<Box
			width={300}
			height={300}
		>
			<Button
				variant='outlined'
				onClick={handleClick}
				disabled={!url}
			>
				aaaaaaaa
			</Button>
		</Box>
	);
};
