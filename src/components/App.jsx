import '../App.scss';
import React, { useState, useEffect } from 'react';
import { productsArray, aboutInfo } from '../js/productsData';
import Header from './Header';
import { LanguageContext } from '../js/context';
import LanguageSwitcher from './LanguageSwitcher';
import AboutBlock from './AboutBlock';
import OrderBlock from './OrderBlock';
import ProductsList from './ProductsList';
import OrderPopup from './OrderPopup';
import Footer from './Footer';
import PreviewPhotoPopup from './PreviewPhotoPopup';

function App() {
  const aboutInfoBlocks = [];
  const [language, setLanguage] = useState('ua');
  const [orderButtonStatus, setOrderButtonStatus] = useState('unactive');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(null);
  const [totalSumOfOrder, setTotalSumOfOrder] = useState(0);
  const [checkedProductsInputs, setCheckedProductsInputs] = useState(() => (
    productsArray.map(product => {
      return {
        id: product.id,
        checked: false
      }
    })
  ));
  const [overlayStatus, setOverlayStatus] = useState('closed');
  const [currentProductImage, setCurrentProductImage] = useState('');


  useEffect(switchOrderBtnStatus, [selectedProducts.length]);
  useEffect(handleChangeTotalSumOfOrder, [selectedProducts]);


  function switchOrderBtnStatus() {
    if (selectedProducts.length > 0) {
      setOrderButtonStatus('active');
    } else {
      setOrderButtonStatus('unactive');
    };
  }


  aboutInfo.forEach((item, index) => {
    aboutInfoBlocks.push(
      <AboutBlock 
        title={language === 'ua' ? item.title : item.titleEng} 
        text={language === 'ua' ? item.text : item.textEng}
        key={index}/>
    )
  });


  function handleLanguageSwitch(e) {
    if(e.target.classList.contains('active')) return;
    setLanguage(language === 'ua' ? 'us' : 'ua');
  }


  function handleSelectedProductsUpdating(e) {
    const selectedItem = productsArray.find(product => {
      return product.id.toString() === e.target.id;
    });

    if(e.target.checked) {
      setSelectedProducts(prevSelectedProducts => (
        [...prevSelectedProducts, {
          name: selectedItem.name,
          image: selectedItem.image,
          nameEng: selectedItem.nameEng,
          quantity: 1,
          price: selectedItem.price,
          totalSum: selectedItem.price * 1,
          id: selectedItem.id
        }]
      ));
    } else {
      setSelectedProducts(prevSelectedProducts => (
        [...prevSelectedProducts].filter(product => product.name !== selectedItem.name)
      ));
    }
  }


  function handleOpenPopup(popupName) {
    setOrderButtonStatus('unactive');
    setOverlayStatus('opened');
    document.getElementsByTagName('html')[0].classList.add('is-overlay-opened');
    setIsPopupOpen(popupName);
  }

  function closePopup() {
    switchOrderBtnStatus();
    setOverlayStatus('closed');
    document.getElementsByTagName('html')[0].classList.remove('is-overlay-opened');
    setIsPopupOpen(null);
  }

  function handleClosePopup(e, defaultClose = false) {
    if(!defaultClose) {
      if(isPopupOpen && (!e.target.closest('.popup') || e.target.closest('.popup__close-btn'))) {
        closePopup();
      }
    } else {
      closePopup();
    }
  }


  function handleChangeProductsQuantity(e, direction) {
    const copySelectedProducts = [...selectedProducts];

    const selectedItem = copySelectedProducts.find(product => {
      return product.id.toString() === e.target.id;
    });

    const indexOfSelectedItem = copySelectedProducts.indexOf(selectedItem);

    const newQuantity = direction === 'up' ? (selectedItem.quantity + 1) : (selectedItem.quantity - 1);

    if(newQuantity < 1) return;

    copySelectedProducts[indexOfSelectedItem] = {
      name: selectedItem.name,
      image: selectedItem.image,
      nameEng: selectedItem.nameEng,
      quantity: newQuantity,
      price: selectedItem.price,
      totalSum: selectedItem.price * newQuantity,
      id: selectedItem.id
    }

    setSelectedProducts(copySelectedProducts);
  }


  function handleChangeTotalSumOfOrder() {
    let totalSum = 0;

    selectedProducts.forEach(product => {
      return totalSum = totalSum + product.totalSum;
    });

    setTotalSumOfOrder(totalSum);
  }


  function handleDeleteOrderItem(e, deleteByDefault = false) {
    if(!deleteByDefault) {
      const copySelectedProducts = [...selectedProducts];

      const selectedItem = copySelectedProducts.find(product => {
        return product.id.toString() === (e.target.closest('button')).getAttribute('id');
      });
  
      const indexOfSelectedItem = copySelectedProducts.indexOf(selectedItem);
  
      copySelectedProducts.splice(indexOfSelectedItem, 1);

      setSelectedProducts(copySelectedProducts);
    } else {
      setSelectedProducts([]);
    }
  }


  function handleProductsInputsCheck(e, uncheckByDefault = false) {
    let copyCheckedProductsInputs = [...checkedProductsInputs];

    if(!uncheckByDefault) {
      const clickedInput = copyCheckedProductsInputs.find(input => {
        if(e.target.id) {
          return input.id.toString() === e.target.id;
        } else {
          return input.id.toString() === e.target.closest('button').id;
        }
      });
    
      const indexOfClickedInput = copyCheckedProductsInputs.indexOf(clickedInput);

      copyCheckedProductsInputs[indexOfClickedInput] = {
        id: clickedInput.id,
        checked: !clickedInput.checked
      };
    } else {
      copyCheckedProductsInputs.forEach(input => {
        input.checked = false;
      });
    }

    setCheckedProductsInputs(copyCheckedProductsInputs);
  }


  function getProductImageSrc(e) {
    const currentProductImageSrc = productsArray.find(product => {
      return product.id.toString() === e.target.id;
    }).image;

    setCurrentProductImage(currentProductImageSrc);
  }


  return (
    <div className="app" onClick={(e) => handleClosePopup(e)}>
      <LanguageContext.Provider value={language}>
        <Header>
          <LanguageSwitcher onClick={(e) => handleLanguageSwitch(e)}/>
        </Header>

        <div className='app__inner'>{aboutInfoBlocks}</div>

        <OrderBlock>
          <h2 className='title'>{language === 'ua' ? 'Футболки' : 'T-Shirts'} </h2>
          <ProductsList 
            onChange={(e) => {handleSelectedProductsUpdating(e); handleProductsInputsCheck(e); handleChangeTotalSumOfOrder()}}
            onClickPreviewBtn={(e) => {handleOpenPopup('preview-popup'); getProductImageSrc(e)}} 
            productsList={productsArray.filter(item => item.type === 'shirts')}
            productsInputs={checkedProductsInputs}/>

          <h2 className='title'>{language === 'ua' ? 'Чашки' : 'Cups'} </h2>
          <ProductsList 
            onChange={(e) => {handleSelectedProductsUpdating(e); handleProductsInputsCheck(e); handleChangeTotalSumOfOrder()}}
            onClickPreviewBtn={(e) => {handleOpenPopup('preview-popup'); getProductImageSrc(e)}}  
            productsList={productsArray.filter(item => item.type === 'cups')}
            productsInputs={checkedProductsInputs}/>

          <h2 className='title'>{language === 'ua' ? 'Сумки' : 'Bags'} </h2>
          <ProductsList 
            onChange={(e) => {handleSelectedProductsUpdating(e); handleProductsInputsCheck(e); handleChangeTotalSumOfOrder()}}
            onClickPreviewBtn={(e) => {handleOpenPopup('preview-popup'); getProductImageSrc(e)}}  
            productsList={productsArray.filter(item => item.type === 'bags')}
            productsInputs={checkedProductsInputs}/>
        </OrderBlock>

        <OrderPopup
          isPopupActive={isPopupOpen === 'order-popup'}
          onClosePopup={handleClosePopup}
          onDeleteOrderItem={(e) => {handleDeleteOrderItem(e); handleProductsInputsCheck(e)}}
          onDeleteOrderItemByDefault={(e) => {handleDeleteOrderItem(e, true); handleProductsInputsCheck(e, true)}}
          selectedProductsList={selectedProducts}
          totalSum={totalSumOfOrder}
          onPlusQuantity={(e) => {handleChangeProductsQuantity(e, 'up'); handleChangeTotalSumOfOrder()}}
          onMinusQuantity={(e) => {handleChangeProductsQuantity(e, 'down'); handleChangeTotalSumOfOrder()}}/>
          
        <PreviewPhotoPopup
          isPopupActive={isPopupOpen === 'preview-popup'}
          onClosePopup={(e) => handleClosePopup(e)}
          productImage={currentProductImage}/>

        <button 
          className={'button button--make-order ' + (orderButtonStatus === 'active' ? 'active' : '')}
          onClick={() => {handleOpenPopup('order-popup')}}>
          {language === 'ua' ? 'Оформити замовлення' : 'Make order'}
        </button>

        <Footer/>
      </LanguageContext.Provider>

      <div className={'overlay ' + (overlayStatus === 'opened' ? 'is-open' : '')}></div>
    </div>
  );
}

export default App;
