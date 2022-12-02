import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation/BottomNavigation';
import Navigation from '../Navigation/Navigation';

const Layout = () => {
	return (
		<>
			<Navigation />
				<Outlet/>
			<BottomNavigation/>
		</>
	);
};

export default Layout;