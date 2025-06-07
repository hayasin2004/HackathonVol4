import {
	TopPageButton,
	TopPageCopyButton,
	TopPageLoadingMd,
	TopPageMarkdown,
} from '@/components';
import { useGeminiBackground, useGithubFileTreeBackground } from '@/hooks';
import { getActiveTabUrl, parseGithubUrl } from '@/utils';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

export const TopPage = () => {
	const [url, setUrl] = useState<string | null>(null);
	const [generated, setGenerated] = useState<string>('');
	const [isGeminiLoading, setIsGeminiLoading] = useState<boolean>(false);
	const [isGithubUrl, setIsGithubUrl] = useState<boolean>(false);

	useEffect(() => {
		const initialize = async () => {
			const currentUrl = await getActiveTabUrl();
			const parsedUrl = parseGithubUrl(currentUrl);
			if (!parsedUrl) {
				return;
			}
			getActiveTabUrl().then(setUrl);
			setIsGithubUrl(true);
		};
		initialize();
	}, []);

	const { data, isFetched, isLoading, refetch } = useGithubFileTreeBackground(
		url ?? '',
	);
	const { handleGemini } = useGeminiBackground();

	const handleClick = async () => {
		try {
			const currentUrl = await getActiveTabUrl();
			const parsedUrl = parseGithubUrl(currentUrl);
			if (!parsedUrl) {
				setGenerated('NOT GITHUB');
				return;
			}
			setIsGeminiLoading(true);
			setUrl(currentUrl);
			if (!isFetched) {
				// URL から新しく生成
				const githubTreeString = await refetch();
				// console.log(githubTreeString.data);
				const aaa = await handleGemini(
					`${githubTreeString.data}\n上記はある github リポジトリの一部または全体のソースコードです。ソースコードを元にリポジトリ全体ないしは部分的なドキュメントをmd形式で生成してください。また返答はmdファイルの内容のみです。日本語でお願いします`,
				);
				setGenerated(aaa);
			} else {
				// 同じ URL に対するリクエストにはキャッシュを適用
				console.log('キャッシュを使用中:', data);
				const aaa = await handleGemini(
					`${data}\n上記はある github リポジトリの一部または全体のソースコードです。ソースコードを元にリポジトリ全体ないしは部分的なドキュメントをmd形式で生成してください。また返答はmdファイルの内容のみです。日本語でお願いします`,
				);
				setGenerated(aaa);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsGeminiLoading(false);
		}
	};
	return (
		<Box
			width={400}
			maxHeight={500}
			display='flex'
			flexDirection='column'
			alignItems='center'
			gap={2}
			padding='40px 20px'
		>
			<TopPageButton
				disabled={isLoading || isGeminiLoading}
				isGithubUrl={isGithubUrl}
				onClick={handleClick}
			/>
			{isLoading || isGeminiLoading ? (
				<TopPageLoadingMd url={url || ''} />
			) : (
				generated && (
					<Box
						display='flex'
						flexDirection='column'
						alignItems='center'
						gap={5}
						width='100%'
					>
						<TopPageCopyButton copytext={generated} />
						<TopPageMarkdown content={generated} />
					</Box>
				)
			)}
		</Box>
	);
};
