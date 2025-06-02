import { createTheme } from '@mui/material';
import { teal } from '@mui/material/colors';

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: teal.A400,
		},
	},
});
