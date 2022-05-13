import React from 'react';

export default function OrderItem(props) {
  return (
    <li className='order-list__item order-item'>
      <div className='order-item__image'>
        <img src={props.image} alt='Product'/>
      </div>

      <span className='order-item__name'>
        {props.name}
      </span>

      <div className='order-item__quantity-block'>
        <button 
          className='order-item__up' 
          type='button' 
          aria-label='Up count button' 
          id={props.id} 
          onClick={props.incrementQuantity}>
        </button>

        <span className='order-item__quantity'>
          {props.quantity}
        </span>

        <button 
          className='order-item__down' 
          type='button' 
          aria-label='Down count button' 
          id={props.id} 
          onClick={props.decrementQuantity}>
        </button>
      </div>

      <span className='order-item__price'>{props.totalPrice} UAH</span>

      <button
        className='order-item__remove-btn'
        type='button'
        id={props.id} 
        onClick={props.onDeleteOrderItem}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M13.4072 11.993L19.986 5.41421L18.5718 4L11.993 10.5788L5.41421 4.00003L4 5.41424L10.5788 11.993L4.00015 18.5716L5.41436 19.9858L11.993 13.4072L18.5716 19.9859L19.9858 18.5717L13.4072 11.993Z"/>
        </svg>
      </button>
    </li>
  )
}
