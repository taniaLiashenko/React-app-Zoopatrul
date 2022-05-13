import React from 'react';

function Header(props) {
  return (
    <header className='header'>
        <div className='header__top'>
            { props.children }
        </div>

        <div className='header__logo'>
            <img className='header__logo-img' src="images/logo.png" alt='Logo of Zoopatrul'/>
        </div>
    </header>
  )
};

export default Header;
