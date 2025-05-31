import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import type { ReactNode } from 'react';

const styleElement = document.createElement('style');
document.head.appendChild(styleElement);

const styleCache = createCache({
	key: 'plasmo-mui-cache',
	prepend: true,
	container: styleElement,
});

export const getStyle = () => styleElement;

export const MUICacheProvider = ({ children }: { children: ReactNode }) => (
	<CacheProvider value={styleCache}>{children}</CacheProvider>
);
