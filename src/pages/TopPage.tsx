import { useGithubFileTreeFunction } from '@/hook';
import { Box } from '@mui/material';
import { useEffect } from 'react';

export const TopPage = () => {
	useEffect(() => {
		const f = async () => {
			const name = await useGithubFileTreeFunction(
				'https://github.com/hayasin2004/HackathonVol4',
			);
			console.log(name);
		};
		f();
	});
	return (
		<Box
			width={300}
			height={300}
		/>
	);
};
