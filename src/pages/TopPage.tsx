import { MyMarkdownField } from '@/components/MyMarkdownField';
import { useGithubFileTreeBackground } from '@/hooks';
import { getActiveTabUrl } from '@/utils';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { MyButton } from '../components/MyButton';

export const TopPage = () => {
	const [url, setUrl] = useState<string | null>(null);

	const disMarkMock: string =
		'# 見出し\n - まさたかダディダディ\n - どすこいわっしょいピーポーピーポー';

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
			sx={{ mt: 4 }}
			width={400}
			height={300}
			display='flex'
			flexDirection='column'
			alignItems='center'
			gap={2}
		>
			<MyButton
				onClick={handleClick}
				disabled={!url}
			/>
			<MyMarkdownField markdown={disMarkMock} />
		</Box>
	);
};
