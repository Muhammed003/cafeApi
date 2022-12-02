import axios, { axiosPrivate } from '../api/axios';
import useAuth from './useAuth'
const GET_REFRESH_TOKEN = '/api/account/token/refresh/';

const useRefreshToken = () => {
	const { auth, setAuth } = useAuth();
	const refresh = async () => {
		
		let token = JSON.parse(localStorage.getItem("token"));
		const Authorization = `Bearer ${auth?.access}`;
		try {
			const response = await axios.post(GET_REFRESH_TOKEN,
				{
					refresh: token?.refresh,
				},
				{
					headers: { Authorization },
				});
			localStorage.setItem(
				"token",
				JSON.stringify({
					refresh: token?.refresh,
					access: response?.data?.access,
				})
			);
			// setAuth(prev => {
			// 	return {
			// 		...prev,
			// 		roles: response.data.roles,
			// 		access: response.data.access
			// 	}
				
			// }); 
			return response.data.access;

		}
		catch (error) {
			console.log(error);
		 }
		

	}
	return refresh;
};

export default useRefreshToken;