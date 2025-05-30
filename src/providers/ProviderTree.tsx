'use client';
import type { ProviderTreeParams } from '@/interfaces';
import { TanStackProvider } from '@/libs';
import { type ReactElement, useMemo } from 'react';
import { MUICacheProvider } from './MUICacheProvider';
import { buildProviderTree } from './buildProviderTree';

export const ProviderTree = ({ children }: ProviderTreeParams) => {
	const providers: ReactElement[] = [
		<TanStackProvider key='next-tanstack-provider'>
			{children}
		</TanStackProvider>,
		<MUICacheProvider key='mui-cache-provider'>{children}</MUICacheProvider>,
	];

	// biome-ignore lint: 依存配列は空でよい
	const ProviderTrees = useMemo(
		() => buildProviderTree({ providers, children }),
		[],
	);

	return <ProviderTrees>{children}</ProviderTrees>;
};
