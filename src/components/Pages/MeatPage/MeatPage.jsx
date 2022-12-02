import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const MeatPage = (props) => {
	return (
		<Container className=''>
			<h4 className='text-center pt-1'>{props.name}</h4>
			<div className=" content mb-4">
				<NavLink to="/settings/users/add" className='d-flex bg-warning text-shadow-dark mb-3'>
					<div className='w-75 text-white '><FontAwesomeIcon icon={faPlus} className="pe-3"/> Добавить мясо</div>
							
				</NavLink>
				<NavLink to="/settings/users/add" className='d-flex bg-primary mb-3'>
					<div className='w-75 text-white '><FontAwesomeIcon icon={faEdit} className="pe-3"/> Изменить мясо</div>
							
				</NavLink>
				<NavLink to="/settings/users/add" className='d-flex bg-danger mb-3'>
					<div className='w-75 text-white '><FontAwesomeIcon icon={faTrash} className="pe-3"/> Удалить мясо</div>
							
				</NavLink>
			</div>
		</Container>
	);
};

export default MeatPage;