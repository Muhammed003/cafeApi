import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Form } from 'react-bootstrap';
import axios from "../../../../api/axios";
const ProductDetail = () => {
	const { id } = useParams();
	const [productdetail, setProductDetail] = useState();

	const [name, setName] = useState('');
	const [group, setGroup] = useState('');
	const [type, setType] = useState('');
   const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);


	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let token = JSON.parse(localStorage.getItem("token"));
			const response = await axios.patch(`api/products/${id}/`, JSON.stringify({
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


	useEffect(() => {
		let isMounted = true;
		const getProducts = async () => {
			try {
				const response = await axios.get(`api/products/${id}/`, {
					withCredentials: true
				});
				setName(response?.data?.name)
				setGroup(response?.data?.group_item)
				setType(response?.data?.type)
				isMounted && setProductDetail(response.data);
			}
			catch (err) {
				console.error(err);
				// navigate("/login", { state: { from: location }, replace: true });
			}
		}
		getProducts();
		
		return () => {
			isMounted = false;
		}

	}, [])

	return (
	<>
			{success ? (
				<section>
					<div className='alert alert-success'>Вы успешно изменили товар.</div>
					<NavLink to="/product/list/" className='text-decoration-none d-block p-2 bg-warning rounded text-center m-2 text-dark'><FontAwesomeIcon icon={faArrowLeft} className="pe-3"/> Назад</NavLink>
				</section>
			) : (
				<Container className='fs-5'>
						<div className='fs-4 text-center text-warning mb-4 fw-bold'>
						<div className="text-center">{name}</div>
					</div>
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

export default ProductDetail;