import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { tanStackQueryClient } from './tanStackQueryClient';

export const TanStackProvider = ({ children }: { children: ReactNode }) => {
	return (
		<QueryClientProvider client={tanStackQueryClient}>
			{children}
		</QueryClientProvider>
	);
};
