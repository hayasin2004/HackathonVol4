import { ThemeProvider } from '@emotion/react';
import { Box, Button, CssBaseline } from '@mui/material';
import { useState } from 'react';
import { ProviderTree, getStyle } from './providers';
import { Routing } from './routes';
import { darkTheme, lightTheme } from './themes';

document.head.appendChild(getStyle());

function IndexPopup() {
	const [isDark, setIsDark] = useState(true);

	const toggleTheme = () => {
		setIsDark((prev) => !prev);
	};

	return (
		<ProviderTree>
			<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
				<CssBaseline />
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 3 }}>
					<Button
						onClick={toggleTheme}
						variant='outlined'
						sx={{ mt: 2 }}
					>
						{isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
					</Button>
				</Box>
				<Routing />
			</ThemeProvider>
		</ProviderTree>
	);
}

export default IndexPopup;
