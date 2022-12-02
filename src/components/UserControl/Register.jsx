import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import axios from '../../api/axios';
import './User.css'

const USER_REGEX = /^[А-я][А-я0-9-_]{2,23}$/;
const PHONENUMBER_REGEX = /^[0-9]{9,9}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.).{8,24}$/;
const REGISTER_URL = 'api/account/register/';


const Register = (props) => {
	const userRef = useRef();
   const errRef = useRef();

   const [user, setUser] = useState('');
   const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);
	
	const [phonenumber, setPhoneNumber] = useState('');
   const [validPhonenumber, setValidPhoneNumber] = useState(false);
   const [phonenumberFocus, setPhoneNumberFocus] = useState(false);

   const [pwd, setPwd] = useState('');
   const [validPwd, setValidPwd] = useState(false);
   const [pwdFocus, setPwdFocus] = useState(false);

   const [matchPwd, setMatchPwd] = useState('');
   const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);
	
	const [user_type, setUserType] = useState('');
	const [validUser_type, setValidUserType] = useState(false);

   const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);
	useEffect(() => {
		userRef.current.focus();
   }, [])

	useEffect(() => {
	  setValidName(USER_REGEX.test(user));


	}, [user])

	useEffect(() => {
		if (!(phonenumber?.charAt(0) === "0")) {
			setValidPhoneNumber(PHONENUMBER_REGEX.test(phonenumber));
		}
	}, [phonenumber])

	useEffect(() => {
		setValidUserType(user_type);
   }, [user_type])

	useEffect(() => {
		const match = pwd === matchPwd;
		setValidPwd(PWD_REGEX.test(pwd));
		setValidMatch(pwd === matchPwd);
   }, [pwd, matchPwd])

   useEffect(() => {
		setErrMsg('');
   }, [user, phonenumber, pwd, matchPwd, user_type])

	const handleSubmit = async (e) => {
		e.preventDefault();
		const v1 = USER_REGEX.test(user);
		const v2 = PWD_REGEX.test(pwd);
		if (!v1 || !v2) {
			 setErrMsg("Invalid Entry");
			 return;
		}
		try {
			let token = JSON.parse(localStorage.getItem("token"));
			const response = await axios.post(REGISTER_URL, JSON.stringify({
				username: user,
				phone_number: "+996"+phonenumber,
				password: pwd,
				password_confirm: matchPwd,
				roles: user_type
			}),
				{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token.access}`
					},
					withCredentials: true
				}

			)
			console.log(response.data);
			setSuccess(true);

		} catch (err) {
			if (!err?.response) {
				setErrMsg("Нет соединение с сервером");
			}
			else if (err.response?.status === 409) {
				setErrMsg("Пользователь с таким номером уже добавлен");
			}
			else {
				setErrMsg("Добавить не удалась")
			}
			errRef.current.focus()
		}
	}
	return (
		<>
			{success ? (
				<section>
					<div className='alert alert-success'>Вы успешно добавили</div>
				</section>
			) : (
				<Container className='Add-user'>
					<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
					<h4 className='text-center pt-1'>{props.name}</h4>
					<Form onSubmit={handleSubmit}>


						<Form.Label
							htmlFor='username'
							className='m-2 d-flex justify-content-between'>
							Имя
							<FontAwesomeIcon icon={faCheck} className={validName ? "valid text-white rounded-circle p-0-2 bg-success" : "hide"} />
							<FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid text-white rounded-circle p-0-2 bg-danger"} />
						</Form.Label>
						<Form.Control
							id='username'
							type='text'
							ref={userRef}
							autoComplete="off"
							className='mb-3'
							required
							value={user}
							onChange={(e) => setUser(e.target.value)}
							aria-invalid={validName ? "false" : "true"}
							aria-describedby="uidnote"
							onFocus={() => setUserFocus(true)}
							onBlur={() => setUserFocus(false)}
						/>
						<p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
							<FontAwesomeIcon icon={faInfoCircle} className="pe-2" />
							От 4 до 24 символов.<br />
							Должен начинаться с буквы.<br />
							Допускаются буквы, цифры, символы подчеркивания, дефисы.
						</p>
						
						

						<Form.Label
							htmlFor='phonenumber'
							className='m-2  d-flex justify-content-between'>
							Мобилный телефон
							<FontAwesomeIcon icon={faCheck} className={validPhonenumber ? "valid text-white rounded-circle p-0-2 bg-success" : "hide"} />
							<FontAwesomeIcon icon={faTimes} className={validPhonenumber || !phonenumber ? "hide" : "invalid text-white rounded-circle p-0-2 bg-danger"} />
						</Form.Label>
						<InputGroup>
							<InputGroup.Text className='mb-3'
								id="">
								+996
							</InputGroup.Text>

							<Form.Control
								ref={userRef}
								autoComplete="off"
								id='phonenumber'
								type='number'
								className='mb-3'
								required
								value={phonenumber}
								onKeyPress={(e) => {
									if (e.key === "e" || e.key === "-" || e.key === "+" || e.key === "." || e.key === ",") {
										e.preventDefault();
									}
								}}
								onChange={(e) => setPhoneNumber(e.target.value)}
								aria-invalid={validPhonenumber ? "false" : "true"}
								aria-describedby="phonenumbernote"
								onFocus={() => setPhoneNumberFocus(true)}
								onBlur={() => setPhoneNumberFocus(false)}
							/>
						</InputGroup>
						<p id="phonenumbernote" className={phonenumberFocus && phonenumber && !validPhonenumber ? "instructions" : "offscreen"}>
							<FontAwesomeIcon icon={faInfoCircle} className="pe-2" />
							Допускаются только 9 цифры.<br />
							Пишите номер без нуля.
					
						</p>
						

					
						<Form.Label
							htmlFor='password'
							className='m-2  d-flex justify-content-between'>
							Пароль
							<FontAwesomeIcon icon={faCheck} className={validPwd ? "valid text-white rounded-circle p-0-2 bg-success" : "hide"} />
							<FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid text-white rounded-circle p-0-2 bg-danger"} />
					
						</Form.Label>
						<Form.Control
							id='password'
							type='password'
							className='mb-3  d-flex justify-content-between'
							required
							value={pwd}
							onChange={(e) => setPwd(e.target.value)}
							aria-invalid={validPwd ? "false" : "true"}
							aria-describedby="pwdnote"
							onFocus={() => setPwdFocus(true)}
							onBlur={() => setPwdFocus(false)} />
					
						<p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
							<FontAwesomeIcon icon={faInfoCircle} className="pe-2" />
							От 8 до 24 символов.<br />
							Должен содержать заглавные и строчные буквы, цифру и специальный символ.<br />
							Разрешенные специальные символы: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
						</p>


						<Form.Label
							htmlFor='password_confirm'
							className='m-2  d-flex justify-content-between'>
							Подтверждение пароля
							<FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid text-white rounded-circle p-0-2 bg-success" : "hide"} />
							<FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid text-white rounded-circle p-0-2 bg-danger"} />
					
						</Form.Label>
						<Form.Control
							id='password_confirm'
							type='password'
							className='mb-3'
							required
							value={matchPwd}
							onChange={(e) => setMatchPwd(e.target.value)}
							aria-invalid={validMatch ? "false" : "true"}
							aria-describedby="confirmnote"
							onFocus={() => setMatchFocus(true)}
							onBlur={() => setMatchFocus(false)}

					
						/>
						<p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
							<FontAwesomeIcon icon={faInfoCircle} className="pe-2" />
							Должен соответствовать первому полю ввода пароля.
						</p>
					

						<Form.Label
							htmlFor='type_user'
							className='m-2'>
							Тип пользователья:
						</Form.Label>
						<Form.Select
							className="bg-info"
							required
							value={user_type}
							onChange={(e) => setUserType(e.target.value)}
						>
							<option value="" disabled>Выберите</option>
							<option value="1">Админ</option>
							<option value="2">Шеф</option>
							<option value="3">Администратор</option>
							<option value="4">Работник</option>
							<option value="5">Официант</option>
							<option value="6">Самсышник</option>
							<option value="7">Мясник</option>
							<option value="8">Демо</option>
						</Form.Select>
						<Button
							type='submit'
							variant='warning'
							className='mx-auto d-block mt-4'
							disabled={!validName || !validPhonenumber || !validPwd || !validMatch || !validUser_type ? true : false}
						>
							Сохранить
						</Button>
					</Form>
				</Container>
			)}
		</>
	);
};

export default Register;