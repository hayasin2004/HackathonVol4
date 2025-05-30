import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { MUICacheProvider, getStyle } from './providers';
import { Routing } from './routes';
import { darktheme } from './themes';

document.head.appendChild(getStyle());

function IndexPopup() {
	return (
		<MUICacheProvider>
			<ThemeProvider theme={darktheme}>
				<CssBaseline />
				<Routing />
			</ThemeProvider>
		</MUICacheProvider>
	);
}

export default IndexPopup;
