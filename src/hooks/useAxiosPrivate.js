import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
	const refresh = useRefreshToken();
	let auth = JSON.parse(localStorage.getItem("token"));
	// const { auth } = useAuth();
	useEffect(() => {
		const requestIntercept = axiosPrivate.interceptors.request.use(
			async config => {
				let token = await JSON.parse(localStorage.getItem("token"));
            config.headers = {
					'Authorization': `Bearer ${token?.access}`,
				}
            return config;
			}, (error) => Promise.reject(error)
		);

		// const responseIntercept = axiosPrivate.interceptors.response.use(
		// 	response => response,
		// 	async (error) => {
		// 		const prevRequest = error?.config;
		// 		if (error?.response?.status === 403 && !prevRequest?.sent) {
		// 			prevRequest.sent = true;
		// 			const newAccess = await refresh();
		// 			prevRequest.headers['Authorization'] = `Bearer ${newAccess}`;
					
		// 			return axiosPrivate(prevRequest);
		// 		}
		// 		return Promise.reject(error)
		// 	}
		// );
		const responseIntercept = axiosPrivate.interceptors.response.use(
			response => response,
			async (error) => {
			  const prevRequestConfig = error.config;
			  if (error?.response?.status === 401 && !prevRequestConfig.sent) {
				 prevRequestConfig.sent = true;
				 const newAccessToken = await refresh();
				 prevRequestConfig.headers = { ...prevRequestConfig.headers };
				 prevRequestConfig.headers[
					"Authorization"
				 ] = `Bearer ${newAccessToken}`;
				 return axiosPrivate(prevRequestConfig);
			  }
			  return Promise.reject(error);
			}
		 );
		return () => {
			axiosPrivate.interceptors.request.eject(requestIntercept);
			axiosPrivate.interceptors.response.eject(responseIntercept);
		}
		
	}, [auth?.access, refresh])
	return axiosPrivate;

}

export default useAxiosPrivate;