import { faLock, faMobileScreen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Form, FormLabel, InputGroup } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import './login.css'
import axios from '../../../api/axios'
import useLocalStorage from '../../../hooks/useLocalStorage';
import useInput from '../../../hooks/useInput';
import useToggle from '../../../hooks/useToggle';
const LOGIN_URL = '/api/account/login/'; 
const Login = () => {
	const {auth, setAuth} = useAuth()
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	const userRef = useRef();
	const errRef = useRef();

	const [phonenumber, resetUser, userAttribs] = useInput('phonenumber', '');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [check, toggleCheck] = useToggle('persist', false)

	useEffect(() => {
		userRef.current.focus();
	}, [])
	useEffect(() => {
		setErrMsg('');

	}, [phonenumber, pwd])

	const handleSubmit = async (e) =>{
		e.preventDefault();
		let phone_number = "+996"+phonenumber;
		let password = pwd;
		
		try {
			const response = await axios.post(LOGIN_URL,
				JSON.stringify({ phone_number, password }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true
				}
				
			);
			localStorage.setItem("token", JSON.stringify(response.data));
			localStorage.setItem("phone_number", JSON.stringify(phone_number));
			const access = response?.data?.access;
			const roles = response?.data?.roles;
			setAuth({ phone_number, roles, access });
			// setUser('');
			resetUser();
			setPwd('');
			navigate(from, { replace: true });
		}
		catch (err) {
			if (!err?.response) {
				setErrMsg("No server response");
			}
			else if (err.response?.status === 400) {
				setErrMsg("Не правильный данные");
			}
			else if (err.response?.status === 401) {
				setErrMsg("Незарегистрированный пользователь !");
			}
			else {
				setErrMsg("Войти не удалось")
			}
		}


		

	}
	// const togglePersist = () => {
	// 	setPersist(prev => !prev);
	// }
	// useEffect(() => {
	// 	localStorage.setItem("persist", persist);
		
	// }, [persist])
	return (
		<>
			<section>
				<div className='loginPage'>
					<div className=" bg-dark p-4 rounded border border-info">
						{errMsg ?
							<p ref={errRef} className="alert alert-danger">{errMsg}</p>
							:""
						}

						<h3 className='text-center display-3 text-info fw-bold text-shadow-dark'>Новый<br/> кафе</h3>
						<Form className='Add-user' onSubmit={handleSubmit}>
							<FormLabel htmlFor='phonenumber' className='form-label fw-bold'>Телефон номер без нуля: </FormLabel>
							<InputGroup className="mb-3">
								<InputGroup.Text id="basic-addon1">+996</InputGroup.Text>
								<Form.Control id='phonenumber' type='text' inputMode='numeric' ref={userRef} autoComplete="on"
									{...userAttribs}
									required
									className='' maxLength="9" size='9' minLength='9' />
							</InputGroup>
							<FormLabel htmlFor='password' className='form-label fw-bold'> Пароль</FormLabel>
							<InputGroup className="mb-3">
								<InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faLock} className=""/></InputGroup.Text>
								<Form.Control id='password' type='text' className='' maxLength='15' onChange={(e) => setPwd(e.target.value)} required value={pwd}  minLength='9'  />
							</InputGroup>
							<div className='persistCheck'>
								<Form.Check
									type="checkbox"
									id="persist"
									onChange={toggleCheck}
									checked={check}
									className="pe-2 d-inline-block"
								/>
								<label htmlFor="persist">Доверять этому устройству</label>
							</div>
							<Button type='submit' className='mx-auto d-block mt-4 w-50' variant='warning'>Войти</Button>
					</Form>
					</div>
				</div>
			</section>
					
		</>
	);
};

export default Login;