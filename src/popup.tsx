import { CssBaseline, ThemeProvider } from '~node_modules/@mui/material';

import { Routing } from './routes';
import { darktheme } from './themes';

function IndexPopup() {
	return (
		<ThemeProvider theme={darktheme}>
			<CssBaseline />
			<Routing />
		</ThemeProvider>
	);
}
