import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ProviderTree, getStyle } from './providers';
import { Routing } from './routes';
import { darkTheme } from './themes';

document.head.appendChild(getStyle());

function IndexPopup() {
	return (
		<ProviderTree>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<Routing />
			</ThemeProvider>
		</ProviderTree>
	);
}

export default IndexPopup;
