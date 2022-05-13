import React from 'react';
import { useContext } from 'react';
import { LanguageContext } from '../js/context';

export default function ProductCard(props) {
    const currentLanguage = useContext(LanguageContext);

    return (
        <div className='product-card'>
            <div className='product-card__top'>
                <div className='product-card__image'>
                    <img src={props.product.image} alt='Product'/>
                </div>
                <div className='product-card__description'>
                    <p className='product-card__name'>{currentLanguage === 'ua' ? props.product.name : props.product.nameEng}</p>
                    
                    {currentLanguage === 'ua' ? props.product.descriptionFull : props.product.descriptionFullEng}
                    
                    <button 
                        type='button' 
                        className='product-card__button button' 
                        onClick={props.onClickPreviewBtn} 
                        id={props.product.id}>
                        {currentLanguage === 'ua' ? 'Дивитись повне фото' : 'View full image'}
                    </button>
                </div>
            </div>

            <div className='product-card__bottom'>
                <input onChange={props.onChange} className='product-card__input' name='buy' type='checkbox' checked={props.productInput.checked} id={props.product.id}/>
                
                <label className='product-card__input-title' htmlFor ='buy'>
                    {currentLanguage === 'ua' ? 'Хочу це!' : 'I want it!'}
                </label>

                <span className='product-card__price'>{props.product.price} UAH</span>

                <p className='product-card__author-info'>
                    <span className='product-card__author-title'>
                        {currentLanguage === 'ua' ? 'Автор арту: ' : 'Author of the art: '}
                    </span>
                    <a className='product-card__author-name' href={props.product.author.link}>
                        {props.product.author.name}
                    </a>
                </p>
            </div>
        </div>
    )
}
