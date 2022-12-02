import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const UnAuthorized = () => {
	return (
		<div className='d-flex vh-100 align-items-center justify-content-center flex-column'>
			<h1 className='display-1 text-danger fw-bold  text-center text-uppercase '><FontAwesomeIcon icon={faLock}/></h1>
			<h1 className='display-1 text-danger fw-bold  text-center text-uppercase '>Доступ<br></br> запрещен</h1>
		</div>
	);
};

export default UnAuthorized;