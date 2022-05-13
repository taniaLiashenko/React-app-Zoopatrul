import React, { useContext } from 'react';
import OrderItem from './OrderItem';
import { LanguageContext } from '../js/context';

export default function OrderList(props) {
  const currentLanguage = useContext(LanguageContext);

  const orderList = props.selectedProducts.map((product, index) => {
    return <OrderItem 
      onDeleteOrderItem={props.onDeleteOrderItem}
      incrementQuantity={props.onPlusQuantity}
      decrementQuantity={props.onMinusQuantity}
      image={product.image}
      name={currentLanguage === 'ua' ? product.name : product.nameEng}
      quantity={product.quantity}
      price={product.price}
      totalPrice={product.totalSum}
      id={product.id}
      key={index}
      index={index}
    />
  });

  return (
    <ul className='order-list'>
      {orderList}
    </ul>
  )
}
