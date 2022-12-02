import { faCheck, faPlus, faUser, faUserFriends, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
const GET_USERS_URL = '/api/account/users/';


const UserList = (props) => {
	const [users, setUsers]= useState();
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();
		const getUsers = async () => {
			try {
				const response = await axiosPrivate.get(GET_USERS_URL, {
					signal: controller.signal,
					withCredentials: true
				});
				isMounted && setUsers(response.data)
			}
			catch (err) {
				console.error(err);
				navigate("/login", { state: { from: location }, replace: true });
			}
		}
		getUsers();
		
		return () => {
			isMounted = false;
			controller.abort();
		}

	}, [])
	return (
		<Container>
			<h3 className='text-center pt-1'>{props.name}</h3>
			<div className=" content mb-4">
				<NavLink to="/settings/users/add" className='d-flex bg-primary'>
							<div className='w-25 text-center text-dark'><FontAwesomeIcon icon={faUser} /></div>
							<div className='w-75 text-white '><FontAwesomeIcon icon={faPlus} /> Добавить пользователи</div>
							
				</NavLink>
			</div>
			{users?.length
				? (
				<div>
					{users.map((item, id) => (
						<div key={id} className="content bg-warning justify-content-between d-flex text-dark fw-bold rounded border-bottom border-white border-2 my-2">
							<div className='p-2'>{item.username}</div>
							{item.is_active ?
								<div className='m-1 px-2 py-1 bg-success rounded'><FontAwesomeIcon icon={faCheck} /></div>
								:
								<div className='m-1 px-2 py-1 bg-danger rounded'><FontAwesomeIcon icon={faXmark} /></div>
								
							}
						</div>
					))}
				</div>
				)
				:<p>No users to display</p>
		}
		</Container>
	);
};

export default UserList;
