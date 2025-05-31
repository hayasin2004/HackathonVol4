'use client';
import { QueryClient } from '@tanstack/react-query';

export const tanStackQueryClient: QueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});
