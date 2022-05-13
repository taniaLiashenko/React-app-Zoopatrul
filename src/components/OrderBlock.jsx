import React from 'react';

export default function OrderBlock(props) {
    return (
        <div className='app__background-block app__margin-block'>
            <div className='animated-image'>
                <img src='images/cat-animation.png' width='170' alt='Cat'/>
            </div>

            {props.children}
        </div>
    )
}
