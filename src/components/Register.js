import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import Header from './Header.js';
import Main from './Main.js';

const Register = ({ handleTooltipOpen, handleSuccess }) => {

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.register(formValue.email, formValue.password, handleTooltipOpen, handleSuccess)
    .then((res) => {
      if (res.ok) {
        navigate('/sign-in', {replace: true})
      }
    })
  }

  return (
  <>
    <Header 
      title={'Войти'}
      link={'/sign-in'}
    />

    <Main 
      handleSubmit={ handleSubmit }
      handleChange={ handleChange }
      formValue={ formValue }
      title={ 'Регистрация' }
      buttonText={ 'Зарегистрироваться' }
    >
      <Link 
        to='/sign-in' 
        className="auth__link">
        Уже зарегистрированы? Войти
      </Link>
    </Main>
  </> 
  )
}

export default Register;