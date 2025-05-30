import { CssBaseline, ThemeProvider } from '~node_modules/@mui/material';
import { darktheme } from './themes';

function IndexPopup() {
	return (
		<ThemeProvider theme={darktheme}>
			<CssBaseline />
		</ThemeProvider>
	);
}

export default IndexPopup;
