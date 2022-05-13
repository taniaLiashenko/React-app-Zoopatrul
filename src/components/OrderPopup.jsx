import React, {useContext, useState } from 'react';
import { LanguageContext } from '../js/context';
import CustomerDataForm from './CustomerDataForm';
import Popup from './Popup';
import OrderList from './OrderList';

export default function OrderPopup(props) {
  const currentLanguage = useContext(LanguageContext);

  const [formIsSent, setFormIsSent] = useState(false);

  function handleFormSendingStatus(isSent) {
    isSent ? setFormIsSent(true) : setFormIsSent(false);
  }

  return (
    <Popup isActive={props.isPopupActive} onClosePopup={props.onClosePopup}>
      <div className={'popup__content ' + (formIsSent ? 'hidden' : '')}>
        <h3 className='popup__title'>
          {currentLanguage === 'ua' ? 'Обрані позиції для замовлення' : 'Choosen products for the order'}:
        </h3>

        <h4 className='popup__subtitle'>
          <span>{currentLanguage === 'ua' ? 'Назва' : 'Name'}</span>
          <span>{currentLanguage === 'ua' ? 'Кількість' : 'Quantity'}</span>
        </h4>

        <OrderList 
          onDeleteOrderItem={props.onDeleteOrderItem}
          onPlusQuantity={props.onPlusQuantity}
          onMinusQuantity={props.onMinusQuantity}
          selectedProducts={props.selectedProductsList}
        />

        <CustomerDataForm
          selectedProducts={props.selectedProductsList}
          onDeleteOrderItemByDefault={props.onDeleteOrderItemByDefault}
          onClosePopup={props.onClosePopup}
          totalSum={props.totalSum}
          onFormSending={handleFormSendingStatus}/>
      </div>

      <div className={'popup__content ' + (formIsSent ? '' : 'hidden')}>
        <h3 className='popup__title'>
          {currentLanguage === 'ua' ? 'Ваше замовлення надіслано!' : 'Your order is sent!'}
        </h3>

        <h4 className='popup__subtitle popup__subtitle--center popup__subtitle--margin'>
          {currentLanguage === 'ua' ? 'Найближчим часом з вами сконтактує наш менеджер для уточнення замовлення та оплати' : 'Our manager will contact with you soon for payment and order detalization'}
        </h4>

        <img src='images/cat-dog.webp' height='240' alt='Cat'/>
      </div>
    </Popup>
  )
}
