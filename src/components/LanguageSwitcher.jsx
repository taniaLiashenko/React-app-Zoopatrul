import React from 'react';
import { useContext } from 'react';
import { LanguageContext } from '../js/context';

export default function LanguageSwitcher(props) {
    const currentLanguage = useContext(LanguageContext);
    
    return (
        <div className='header__languages'>
            <button type='button'
             className={'button button--language ' + (currentLanguage === 'ua' ? 'active' : '') }
             onClick={props.onClick}
             >UA</button>

            <button type='button'
             className={'button button--language ' + (currentLanguage === 'us' ? 'active' : '') }
             onClick={props.onClick}>EN</button>
        </div>
    )
}
