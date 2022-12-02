import { faUser, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Settings.css'
const Settings = (props) => {
	return (
		<Container>
			<h3 className='text-center pt-1'>{props.name}</h3>
			<div className="content">
				<NavLink to="users/list/" className='d-flex'>
							<div className='w-25 text-center'><FontAwesomeIcon icon={faUserFriends} /></div>
							<div className='w-75 text-white'>Управление пользователями</div>
							
				</NavLink>
			</div>
		</Container>
	);
};

export default Settings;