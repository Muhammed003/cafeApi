import React from 'react';
import './BottomNavigation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faDrumstickBite, faPlus,faClockRotateLeft, faCartArrowDown, faCarrot, faCow, faBasketShopping, faShop } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
const BottomNavigation = (e) => {
	function add_button() {
		const order_menu = document.getElementById('order_menu')
		const button_bottom_navigation = document.getElementById('button_bottom_navigation')
		const covering_buttons_outside = document.getElementById('covering_buttons_outside')

		const order_menu_li = document.querySelectorAll('#order_menu li')
		order_menu.classList.toggle("animated-main")
		button_bottom_navigation.classList.toggle("animated-buttton")
		covering_buttons_outside.classList.toggle("d-block")

		for (let i = 0; i < order_menu_li.length; i++){
			order_menu_li[i].classList.toggle("animated-main-li")
		}

	}
	return (
		<>
			<div className='position-fixed w-100 top-0 start-0 vh-100 z-index-2' id='covering_buttons_outside' onClick={add_button}></div>
			<div className=' text-white BottomNavigation'>
				<NavLink to="/" className='text-center'>
					<div><FontAwesomeIcon icon={faHome} /></div>
					<span className='nameMenu'>Главная</span>
					
				</NavLink>
				<NavLink  to="/meat" className='text-center'>
					<div><FontAwesomeIcon icon={faDrumstickBite} /></div>
					<span className='nameMenu'>Мясо</span>
					
				</NavLink>
				<button className='text-center' id='button_bottom_navigation' onClick={add_button}>
					<div><FontAwesomeIcon icon={faPlus} /></div>
				</button>
				<NavLink  to="/history" className='text-center'>
					<div><FontAwesomeIcon icon={faClockRotateLeft} /></div>
					<span className='nameMenu'>История</span>
					
				</NavLink>
				<NavLink  to="/cart-item" className='text-center'>
					<div><FontAwesomeIcon icon={faCartArrowDown} /></div>
					<span className='nameMenu'>Корзина</span>
					
				</NavLink>
				
				
				
				
				
			</div>
			<ul className='order-main' id='order_menu'>
				<NavLink to='/order/product/' className='text-white'><FontAwesomeIcon icon={faCarrot	} /></NavLink>
				<NavLink to='/order/meat/' className='text-white'><FontAwesomeIcon icon={faCow	} /> </NavLink>
				<NavLink to='/order/shop/' className='text-white'><FontAwesomeIcon icon={faShop	} /> </NavLink>
				<NavLink to='/order/bazaar/' className='text-white'><FontAwesomeIcon icon={faBasketShopping} /></NavLink>
			</ul>
		</>
	);
	

};

export default BottomNavigation;