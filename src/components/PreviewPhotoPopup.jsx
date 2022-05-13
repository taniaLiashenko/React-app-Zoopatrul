import React from 'react';
import Popup from './Popup';


export default function PreviewPhotoPopup(props) {
  return (
    <Popup isActive={props.isPopupActive} onClosePopup={props.onClosePopup}>
      <img className='popup__preview-photo' src={props.productImage} alt='Product preview'/>
    </Popup>
  )
}
