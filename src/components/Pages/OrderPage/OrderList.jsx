import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Form, InputGroup } from 'react-bootstrap';
import {NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

import { faCartArrowDown, faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const OrderList = () => {
	const {type} = useParams();
	const [products, setProducts] = useState('');
	const [query, setQuery] = useState('');
	const [filteredProducts, setFilteredProducts] = useState('');
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
	const location = useLocation();
	const [orderData, setOrderData] = useState({
		product_name: '',
		product_quantity: '',

	})

	useEffect(() => {

		let isMounted = true;
		const controller = new AbortController();
		const getProducts = async () => {
			try {
				const response = await axiosPrivate.get(`api/products/?search=${type}`, {
					withCredentials: true
				});
				isMounted && setProducts(response.data);
			}
			catch (err) {
				console.error(err);
				// navigate("/login", { state: { from: location }, replace: true });
			}
		}
		getProducts();
		
		return () => {
			isMounted = false;
			controller.abort();
		}

	}, [type])

	// Button up down 
	const stepUpInput = (e) => {
		e.target.parentNode.querySelector('input[type=number]').stepUp();
	}
	const stepDownInput = (e) => {
		e.target.parentNode.querySelector('input[type=number]').stepDown();
	}

	//  FormData input value save
	const handleInput = (product_quantity, product_name) => {
		setOrderData(product_name, product_quantity)
		console.log("yes");
		
	}


	return (
		<Container className='fs-6'>
			<h2 className='text-center text-warning'>Заказ продукты</h2>
			<Form.Control
				type="text"
				placeholder="Поиск"
				className='text-dark'
				onChange={(e) => setQuery(e.target.value)}
			/>
			{products?.length
				?
				(
				<div>
						{query
							? products.filter(
								product => product.name.toLowerCase().includes(query.toLowerCase())).map((item) =>
								(
									<div className="content"  key={item.id}>
										<div className="button-dark justify-content-between d-flex">
											<div className='text-white w-75'>{item.name}</div>
										</div>
									</div>
								))
							:

							products.map((item) =>
									(
								<div className="content"  key={item.id}>
									<div className="button-dark justify-content-between d-flex">
										<div className='text-white w-75 d-flex align-items-center'>{item.name}</div>
										<div className='number-input mx-2 w-25'>
											<button className="" type="button" onClick={(e) => stepDownInput(e)} ></button>
												<InputGroup>
													<Form.Control
														type='number'
													id={`quantity_${item.id}`}
													min="0"
													className="px-1 text-center"
													value={orderData.product_name === item.name ? orderData : "0"
													}
													onChange={(e) => handleInput(e.target.value, item.name)}
													/>
												</InputGroup>
											<button type="button" onClick={(e) => stepUpInput(e)} className="plus"></button>
										</div>
										<div className='text-primary d-flex align-items-center mx-2'>{ item.type}</div>
										<Button variant='warning'><FontAwesomeIcon icon={faCartArrowDown } /></Button>

									</div>
								</div>
									))
				}
				</div>
				)
				:<p>Подождите ...</p>
		}
				  
			</Container>
	);
};

export default OrderList;