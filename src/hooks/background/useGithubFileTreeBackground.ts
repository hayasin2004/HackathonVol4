import type { MessageMetadata } from '@/interfaces';
import { tanstackKeys } from '@/libs';
import { sendToBackground } from '@plasmohq/messaging';
import { useQuery } from '@tanstack/react-query';

export const useGithubFileTreeBackground = (url: string) => {
	const handleGithubFileTree = async (url: string) => {
		console.log('発火');
		const result = await sendToBackground<
			MessageMetadata['github-file-tree']['req'],
			MessageMetadata['github-file-tree']['res']
		>({
			name: 'githubFileTree',
			body: { url },
		});
		return result;
	};

	return useQuery<MessageMetadata['github-file-tree']['res']>({
		queryKey: [tanstackKeys.githubFileTree, url],
		queryFn: () => handleGithubFileTree(url),
		staleTime: Number.POSITIVE_INFINITY,
	});
};
