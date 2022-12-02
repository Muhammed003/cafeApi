import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button,ButtonGroup, Container, Form } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
const GET_PRODUCTS_URL ='api/products/'
const ProductList = (props) => {
	const [products, setProducts] = useState('');
	const [query, setQuery] = useState('');
	const [success, setSuccess] = useState('');
	const [deletingId, setDeletingId] = useState('');
	const [filteredProducts, setFilteredProducts] = useState('');
	const [popup, setPopup] = useState({show: false,id: null,});
	const [active, setActive] = useState('');
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
	const location = useLocation();


	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();
		const getProducts = async () => {
			try {
				const response = await axiosPrivate.get(GET_PRODUCTS_URL, {
					signal: controller.signal,
					withCredentials: true
				});
				setFilteredProducts(response.data)
				setActive("all")
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

	}, [])

	const handleDelete = (e) => {
		setPopup({
			show: true,
			e,
		 });

	}
	const handleDeleteTrue = async () => {
		const response = await axiosPrivate.delete(`/api/products/${deletingId}/`, {
			withCredentials: true
		});
		window.location.reload(true);
		setSuccess(true);
	};
	 
	 // This will just hide the Confirmation Box when user clicks "No"/"Cancel"
	 
	 const handleDeleteFalse = () => {
		setPopup({
		  show: false,
		  id: null,
		});
	 };
	const filterResults = (groupItem, e) => {
		setActive(e.target.id);
		const result = products.filter((mydata) => {
			return mydata.group_item === groupItem;
		});
		setFilteredProducts(result);
	}
	return (
		<>
			{success
				? "aaa"
				: null
			}
			{popup.show && (

				<div className='modal_screen'>
					<div className='bg-white w-75 p-3 rounded shadow-lg fs-4 mb-2'>
						Вы хотите удалить этот товар вы не можете больше восстановить ?
						<div className='d-flex justify-content-end my-3'>
							<Button className='btn btn-secondary text-white mx-2' onClick={() => handleDeleteFalse()}>Отмена</Button>
							<Button className='btn btn-danger text-white mx-2' value={deletingId} onClick={() => handleDeleteTrue()}>Да</Button>
						</div>
					</div>
				</div>
			)}
		<Container>

		
			<div className='pt-1 d-flex justify-content-between mb-2'>
				<div className='px-2 py-1 fs-4'>{props.name}</div>
				<NavLink to="/product/add/" className='px-3 py-1 bg-warning text-dark d-flex align-items-center rounded border border-white'><FontAwesomeIcon icon={faPlus}/></NavLink>
			</div>
			<ButtonGroup className='mb-2 d-flex w-100 justify-content-between'>
				<Button className={active === "all" ? "bg-warning text-dark" : 'border-end border border-dark'} id='all' onClick={(e) => { setFilteredProducts(products, e); setActive("all") }}> Все</Button>
				<Button className={active ===  "product" ? "bg-warning text-dark" : 'border-end border border-dark'} id='product' onClick={(e) => filterResults("product", e)}> Продукты</Button>
				<Button className={active ===  "bazaar" ? "bg-warning text-dark" : 'border-end border border-dark'} id='bazaar' onClick={(e) => filterResults("bazaar", e)}>Базар</Button>
				<Button className={active ===  "shop" ? "bg-warning text-dark" : 'border-end border border-dark'} id='shop' onClick={(e) => filterResults("shop", e)}>Магазин</Button>
			</ButtonGroup>
			<Form.Control
				type="text"
				placeholder="Поиск"
				className='text-dark'
				onChange={(e) => setQuery(e.target.value)}
			/>
			{filteredProducts?.length
				?
				(
				<div>
						{query
							? filteredProducts.filter(
								product => product.name.toLowerCase().includes(query.toLowerCase())).map((item) =>
								(
									<div className="content"  key={item.id}>
										<div className="button-dark justify-content-between d-flex">
											<div className='text-white w-75'>{item.name}</div>
											<NavLink to={`/product/${item.id}/`} className='text-primary px-2'><FontAwesomeIcon icon={faEdit}/></NavLink>
											<Button className='px-2 fw-bold px-2' variant='danger' value={`${item.id}`}
												onClick={(e) => {
													handleDelete(e.target.value);
													setDeletingId(e.target.value)
												}
												}>x</Button>
										</div>
									</div>
								))
							:

							filteredProducts.map((item) =>
									(
								<div className="content"  key={item.id}>
									<div className="button-dark justify-content-between d-flex">
										<div className='text-white w-75'>{item.name}</div>
										<NavLink to={`/product/${item.id}/`} className='text-white rounded p-2 bg-primary'><FontAwesomeIcon icon={faEdit}/></NavLink>
										<Button className='px-2 fw-bold px-2' variant='danger' value={`${item.id}`}
											onClick={
												(e) => {
												handleDelete(e.target.value);
												setDeletingId(e.target.value)
											}
										}
										>x</Button>
									</div>
								</div>
									))
				}
				</div>
				)
				:<p>Подождите ...</p>
		}
				  
			</Container>
		</>
	);
};

export default ProductList;