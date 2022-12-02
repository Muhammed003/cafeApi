import { faFireBurner, faHome, faRectangleList } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './HomePage.css'
import { NavLink } from 'react-router-dom';

const HomePage = () => {
	let height = {
		height: "61%",
	};

	return (
		<div className='container pt-2'>
			<div className='sales_statistics'>
				<h3 className='text-center'>Статистика продаж</h3>
					<div id="graph">
						{/* <div><span style={height}>61</span></div>	
						<div><span>40</span></div>	
		 */}
					</div>
					<div className="content">
					<NavLink to="/product/list/" className=''>
						<div className='w-25 text-center'><FontAwesomeIcon icon={faRectangleList} /></div>
						<div className='w-75 text-white'>Все продукты</div>
						
					</NavLink>
					</div>
			</div>
		</div>
	);
};

export default HomePage;