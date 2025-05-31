import { TextField } from '@mui/material';

export const MyTextField = () => {
	const mockText = 'これはモックのテキストです。';

	return (
		<TextField
			label='ドキュメント表示エリア'
			value={mockText}
			variant='outlined'
			multiline
			rows={8}
			sx={{ width: '86%' }}
			InputProps={{ readOnly: true }}
		/>
	);
};
