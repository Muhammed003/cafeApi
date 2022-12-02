import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const LogOut = () => {
	const {setAuth} = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [isLoggedIn, setIsLoggedIn] = useState(
		() => localStorage.getItem('logged_user') !== null
	);
	const logouting = async () => {
		
		
		localStorage.removeItem("token");
		localStorage.removeItem("phone_number");
		localStorage.removeItem("logged_user");
		setAuth("");
		navigate("/login", { state: { from: location }, replace: true });
	}
	
	return logouting;
};

export default LogOut;