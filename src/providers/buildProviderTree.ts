import type { BuildProviderTreeParams } from '@/interfaces';
import type { ReactNode } from 'react';
import { cloneElement } from 'react';

export const buildProviderTree = ({ providers }: BuildProviderTreeParams) => {
	return ({ children }: { children: ReactNode }) => {
		let childrenWithProviders = children;
		const lastIndex = providers.length - 1;

		for (let i = lastIndex; i >= 0; i--) {
			const element = providers[i];
			// biome-ignore lint: anyは許容する(providerがどんな型を提供するかを予測することはできないため)
			const elementProps = element.props as { [key: string]: any };
			childrenWithProviders = cloneElement(
				element,
				{ ...elementProps },
				childrenWithProviders,
			);
		}

		return childrenWithProviders;
	};
};
