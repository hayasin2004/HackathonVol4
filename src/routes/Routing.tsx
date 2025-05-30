import { MemoryRouter, Route, Routes } from 'react-router-dom/dist';

export const Routing = () => {
	return (
		<MemoryRouter initialEntries={['/']}>
			<Routes>
				<Route
					path='/'
					element={<div>あ</div>}
				/>
			</Routes>
		</MemoryRouter>
	);
};
