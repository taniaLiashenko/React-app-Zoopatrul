import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../js/context';
import { send } from 'emailjs-com';
import { useForm } from 'react-hook-form';

export default function CustomerDataForm(props) {
  const currentLanguage = useContext(LanguageContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(e) {
    onSubmitEmail(e);
  };

  const [toSend, setToSend] = useState({
    userName: '',
    userSurname: '',
    userPhone: '',
    userEmail: '',
    userInsta: '',
    orderedProducts: '',
    totalSum: ''
  });

  useEffect(changeDataAboutOrderForEmail, [props.totalSum]);

  function changeDataAboutOrderForEmail() {
    let order = '';

    if(props.selectedProducts) {
      props.selectedProducts.forEach(product => {
        order = order + ' Товар: ' + product.name;
        order = order + ', кількість: ' + product.quantity + '.';
      });
    }

    setToSend({ ...toSend, 'orderedProducts': order, 'totalSum': props.totalSum });
  }

  const handleChange = (e) => {
    console.log('onchange')
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  const onSubmitEmail = (e) => {
    send(
      'service_e1bhoxl',
      'template_7323tmr',
      toSend,
      'BBbRkjFc_85H8LgcV'
    )
    .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        props.onFormSending(true);

        setTimeout(() => {
          props.onClosePopup(e, true);
          props.onDeleteOrderItemByDefault(e, true);
          props.onFormSending(false);
        }, 5000);
    })
    .catch((err) => {
        console.log('FAILED...', err);
    });
  };

  return (
    <form className='customer-info' onSubmit={handleSubmit(onSubmit)}>
      <div className='popup__total-sum'>
        {currentLanguage === 'ua' ? 'Загальна сума на порятунок тварин' : 'Total amount for saving of animals'}:
        <span>{props.totalSum} UAH</span>
      </div>

      <h3 className='popup__title'>
        {currentLanguage === 'ua' ? 'Ваші контакти' : 'Your contacts'}:
      </h3>

      <label  className='customer-info__label'>
        <span>{currentLanguage === 'ua' ? "Ім'я" : 'Name'}*</span>
        
        <input 
          className='customer-info__input'
          name='userName' 
          {...register('userName', {onChange: (e) => handleChange(e), required: currentLanguage === 'ua' ? "Це поле є обов'язковим" : 'This field is required' })}
          />

        <p className='customer-info__error'>{errors.userName?.message}</p>
      </label>
      
      <label className='customer-info__label'>
        <span>{currentLanguage === 'ua' ? 'Прізвище' : 'Surname'}</span>
        <input 
          className='customer-info__input' 
          name='userSurname' 
          {...register('userSurname', {onChange: (e) => handleChange(e)})}
          />
      </label>

      <label className='customer-info__label'>
        <span>E-mail*</span>
        <input 
          className='customer-info__input' 
          name='userEmail' 
          {...register('userEmail', {onChange: (e) => handleChange(e), required: currentLanguage === 'ua' ? "Це поле є обов'язковим" : 'This field is required', pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: currentLanguage === 'ua' ? 'Некоректний формат email' : 'Uncorrect email format'
          }})}
        />

          <p className='customer-info__error'>{errors.userEmail?.message}</p>
      </label>

      <label className='customer-info__label'>
        <span>{currentLanguage === 'ua' ? 'Телефон' : 'Phone'}*</span>
        <input 
          className='customer-info__input' 
          name='userPhone' 
          {...register('userPhone', {onChange: (e) => handleChange(e), required: currentLanguage === 'ua' ? "Це поле є обов'язковим" : 'This field is required', pattern: {
            value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
            message: currentLanguage === 'ua' ? 'Некоректний формат телефону' : 'Uncorrect phone format'
          }})}
        />

        <p className='customer-info__error'>{errors.userPhone?.message}</p>
      </label>

      <label className='customer-info__label'>
        <span>Instagram</span>
        <input 
          className='customer-info__input' 
          name='userInsta' 
          {...register('userInsta', {onChange: (e) => handleChange(e)})}
        />
      </label>

      <button className='customer-info__button button' type='submit'>
        {currentLanguage === 'ua' ? 'Відправити замовлення' : 'Send my order'}
      </button>
    </form>
  )
}
