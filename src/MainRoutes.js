import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CartItemPage from './components/Pages/CartItemPage';
import HistoryPage from './components/Pages/HistoryPage';
import HomePage from './components/Pages/HomePage/HomePage';
import Layout from './components/Pages/Layout';
import MeatPage from './components/Pages/MeatPage/MeatPage';
import OrderPage from './components/Pages/OrderPage';
import ProductList from './components/Pages/ProductPage/ProductList';
import Settings from './components/Pages/SettingsPage/Settings';
import UserList from './components/UserControl/UserList.jsx';
import Register from './components/UserControl/Register';
import Login from './components/auth_settings/Login/Login';
import RequireAuth from './components/auth_settings/RequireAuth/RequireAuth';
import UnAuthorized from './components/UnAuthorized/UnAuthorized';
import PersistLogin from './components/auth_settings/PersistLogin/PersistLogin';
import ProductAdd from './components/Pages/ProductPage/ProductAdd/ProductAdd';
import ProductDetail from './components/Pages/ProductPage/ProductEdit/ProductEdit';
import OrderList from './components/Pages/OrderPage/OrderList';

const ROLES = {
	'ADMIN': 14555,
	'CHEF': 25622,
	'ADMINISTRATOR':303020,
	'EMPLOYEE': 2222345,
	'WAITRESS': 876543,
	'SAMSISHNIK': 2332233246,
	'BUTCHER': 12345444113,
	'DEMO': 100000,
}

const MainRoutes = () => {
  
	 // pass this callback to components you want to allow logging out
	 // it will update the local state and then get persisted
	

	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route element={<PersistLogin/>}>
					<Route element={<RequireAuth allowedRoles={[ROLES.EMPLOYEE, ROLES.CHEF]}/>}>
						<Route path='' element={<HomePage />} />
						
						<Route path='meat' element={<MeatPage name="Мясо"/>} />
						<Route path='order' element={<OrderPage/>} />
						<Route path='history' element={<HistoryPage/>} />
						<Route path='cart-item' element={<CartItemPage />} />

						{/* Product Page */}
						<Route path='product/list/' element={<ProductList name="Наименование всех товаров" />} />
						<Route path='product/add/' element={<ProductAdd />} />
						<Route path='product/:id/' element={<ProductDetail />} />

						{/* Order Page */}
						<Route path='order/:type/' element={<OrderList />} />


					</Route>
					<Route element={<RequireAuth allowedRoles={[ROLES.CHEF]} />}>	
						{/* Settings */}
						<Route path='settings' element={<Settings name="Настройки" />} />
						<Route path='settings/users/list' element={<UserList name="Управление пользователями" />} />
						<Route path='settings/users/add' element={<Register name="Добавить пользователья" />} />
					</Route>
				</Route>
			</Route>
			{ /* Public routes */}
			<Route path='/login' element={<Login name="Войти" />} />
			<Route path='unauthorized/' element={<UnAuthorized/>} />

			
		</Routes>
	);
};

export default MainRoutes;