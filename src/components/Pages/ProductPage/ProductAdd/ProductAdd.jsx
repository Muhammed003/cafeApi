import {faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import axios from '../../../../api/axios';
import './Product.css'
const PRODUCT_ADD_URL ='api/products/'
const ProductAdd = () => {

	const [name, setName] = useState('');
	const [group, setGroup] = useState('');
	const [type, setType] = useState('');


   const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);


	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let token = JSON.parse(localStorage.getItem("token"));
			const response = await axios.post(PRODUCT_ADD_URL, JSON.stringify({
				name: name,
				type: type,
				group_item: group,
			}),
				{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token?.access}`
					},
					withCredentials: true
				}

			)
			setSuccess(true);

		} catch (err) {
			if (!err?.response) {
				setErrMsg("Нет соединение с сервером");
			}
			else if (err.response?.status === 409) {
				setErrMsg("Товар с таким именем уже добавлен");
			}
			else {
				setErrMsg("Добавить не удалась")
			}
			// errRef.current.focus()
		}
	}
	return (
		<>
			{success ? (
				<section>
					<div className='alert alert-success'>Вы успешно добавили товар.</div>
					<NavLink to="/product/list/" className='text-decoration-none d-block p-2 bg-warning rounded text-center m-2 text-dark'><FontAwesomeIcon icon={faArrowLeft} className="pe-3"/> Назад</NavLink>
				</section>
			) : (
				<Container className='fs-5'>
					<div className='fs-4 text-center text-warning mb-4 fw-bold'>Товар (создание)</div>
					<Form autoComplete='off' onSubmit={handleSubmit}>
						<Form.Label className='text-secondary' htmlFor='name'>Наименование</Form.Label>
						<Form.Control
							type='text'
							id='name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							className='mb-2 bg-transparent border-0 border-bottom rounded-0 shadow-none text-white'
							required
						/>
						<Form.Label className='text-secondary' htmlFor='group'>Группа</Form.Label>
						<Form.Select
							className='mb-4 bg-transparent border-0 border-bottom rounded-0 shadow-none text-white'
							required
							value={group}
							onChange={(e) => setGroup(e.target.value)}
						>
							<option className='text-secondary' value="">Выберите</option>
							<option className='text-dark' value="product">Продукты</option>
							<option className='text-dark' value="bazaar">Базар</option>
							<option className='text-dark' value="shop">Магазин</option>
						</Form.Select>
					

						<Form.Label className='text-secondary' htmlFor='group'>Единица измерения</Form.Label>
						<Form.Select
							className='mb-4 bg-transparent border-0 border-bottom rounded-0 shadow-none text-white'
							required
							value={type}
							onChange={(e) => setType(e.target.value)}
						>
							<option className='text-secondary' value="">Выберите</option>
							<option className='text-dark' value="кг">кг</option>
							<option className='text-dark' value="гр">гр</option>
							<option className='text-dark' value="шт">шт</option>
						</Form.Select>
						<Button type='submit' className='mx-auto d-block w-50' variant='success'>Готово</Button>
					</Form>
				</Container>
			)}
		</>
	);
};

export default ProductAdd;