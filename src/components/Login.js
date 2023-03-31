import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import Header from './Header.js';
import Main from './Main.js';

const Login = ({ onLogin, handleTooltipOpen, handleSuccess }) => {

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
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password){
      return;
    }
    auth.authorize(formValue.email, formValue.password, handleTooltipOpen, handleSuccess)
      .then((data) => {
        if (data.token){
          setFormValue({email: '', password: ''});
          onLogin();
          navigate('/', {replace: true});
        }
      })
      .catch((err) => { 
        console.log(err)
      });
  } 

  return (
    <>
      <Header 
        title={'Регистрация'}
        link={'/sign-up'}
      />

      <Main 
        handleSubmit={ handleSubmit }
        handleChange={ handleChange }
        formValue={ formValue }
        title={ 'Вход' }
        buttonText={ 'Войти' }
      />
    </>
  )
}

export default Login;