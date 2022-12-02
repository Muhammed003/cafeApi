import React from 'react';
import './Navigation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faGear, faUserLarge } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import LogOut from '../auth_settings/LogOut/LogOut';


const Navigation = () => {
	const logouting = LogOut();
	const NameCafe = <span className='logotip text-shadow-dark px-4'>Rayhan</span> 
	return (
		<div className='navigation  bg-navigation mb-2'>
			<div className='Logo w-50'>
			{NameCafe}
			</div>

			<div className='user'>
				
				<NavLink  to='settings/' className='border-0 bg-transparent mx-3 text-white'><FontAwesomeIcon icon={faGear}/></NavLink>

				<NavDropdown
              id="nav-dropdown-white-example"
					title={<FontAwesomeIcon icon={faUserLarge} />}
					menuVariant="light"
					className='d-inline-block'
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logouting}>
				  <FontAwesomeIcon icon={faArrowRightFromBracket}  className="text-danger"/> Выйти
              </NavDropdown.Item>
            </NavDropdown>
			</div>


		</div>
	);
};
export default Navigation;