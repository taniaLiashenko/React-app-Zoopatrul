import React from 'react'

export default function Popup(props) {
  return (
    <div className={'popup ' + (props.isActive ? 'is-open' : '')}>
      <button 
        className='popup__close-btn button button--close' type='button'
        onClick={(e) => props.onClosePopup(e)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M13.4072 11.993L19.986 5.41421L18.5718 4L11.993 10.5788L5.41421 4.00003L4 5.41424L10.5788 11.993L4.00015 18.5716L5.41436 19.9858L11.993 13.4072L18.5716 19.9859L19.9858 18.5717L13.4072 11.993Z"/>
        </svg>
      </button>

      {props.children}
    </div>
  )
}
