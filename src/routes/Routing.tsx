import { TopPage } from '@/pages';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export const Routing = () => {
	return (
		<MemoryRouter initialEntries={['/']}>
			<Routes>
				<Route
					path='/'
					element={<TopPage />}
				/>
			</Routes>
		</MemoryRouter>
	);
};
