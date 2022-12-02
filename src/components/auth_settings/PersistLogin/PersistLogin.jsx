import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useLocalStorage from "../../../hooks/useLocalStorage";
import useRefreshToken from "../../../hooks/useRefreshToken";
import HomePage from "../../Pages/HomePage/HomePage";

const PersistLogin = () => {
	const [isLoading, setIsLoading] = useState(true);
	const refresh = useRefreshToken();
	const [persist] = useLocalStorage('persist', false);
	
	let token = JSON.parse(localStorage.getItem("token"));

	
	useEffect(() => {
		let isMounted = true;

		const verifyRefreshToken = async () => {
			try {
				await refresh();
				console.log("dsss");

			}
			catch (err) {
				console.error(err);
			}
			finally {
				isMounted && setIsLoading(false);
			}
		}
		!token?.access ? verifyRefreshToken() : setIsLoading(false);
		return () => isMounted = false;
		
	}, [])


	return (
		<>
			{!persist
				? <Outlet />
				:isLoading
					? <p>Please wait ...</p>
					: <Outlet />
			}
		</>
	)
};

export default PersistLogin;