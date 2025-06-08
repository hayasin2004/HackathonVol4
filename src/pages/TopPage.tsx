import {
	TopPageButton,
	TopPageCopyButton,
	TopPageLoadingMd,
	TopPageMarkdown,
	MarkdownDownloaderButton,
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
				console.log(githubTreeString.data);
				const aaa = await handleGemini(
					`リポジトリ詳細: ${githubTreeString.data}

                    要約生成要件:
                    1.説明は日本語で
                    2. 一言説明: このプロジェクトを一文で説明
                    3. 技術スタック: 使用技術の要約
                    4. プロジェクトタイプ: Webアプリ/API/ライブラリ/ツール/その他
                    5. コードブロックでの説明は必須

                    アーキテクチャ概要:
                    - フォルダ構成の意図
                    - 主要コンポーネント
                    - 設計パターンの特徴

                    開発・使用方法:
                    - セットアップ手順（推測）
                    - 実行方法
                    - 主要コマンド

                    注目ポイント:
                    - 技術的に興味深い部分
                    - 学習価値
                    - 実用性

                    注意事項:
                    - 依存関係の複雑さ
                    - 設定の注意点
                    - 既知の制限事項`,
				);
				setGenerated(aaa);
			} else {
				// 同じ URL に対するリクエストにはキャッシュを適用
				console.log('キャッシュを使用中:', data);
				const aaa = await handleGemini(
					`リポジトリ詳細: ${data}


                    要約生成要件:
                    1.説明は日本語で
                    2. 一言説明: このプロジェクトを一文で説明
                    3. 技術スタック: 使用技術の要約
                    4. プロジェクトタイプ: Webアプリ/API/ライブラリ/ツール/その他
                    5. コードブロックでの説明は必須


                    アーキテクチャ概要:
                    - フォルダ構成の意図
                    - 主要コンポーネント
                    - 設計パターンの特徴

                    開発・使用方法:
                    - セットアップ手順（推測）
                    - 実行方法
                    - 主要コマンド

                    注目ポイント:
                    - 技術的に興味深い部分
                    - 学習価値
                    - 実用性

                    注意事項:
                    - 依存関係の複雑さ
                    - 設定の注意点
                    - 既知の制限事項`,
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
			width={600}
			maxHeight={700}
			display='flex'
			flexDirection='column'
			alignItems='center'
			gap={2}
			padding='45px 25px'
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
						gap={2}
						width='100%'
					>
						<TopPageCopyButton copytext={generated} />
						<MarkdownDownloaderButton copytext={generated} />
						<TopPageMarkdown content={generated} />
					</Box>
				)
			)}
		</Box>
	);
};
