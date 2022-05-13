import React from 'react';

export default function AboutBlock(props) {
  return (
    <div className='about-block'>
      <h2 className='about-block__title'>{props.title}</h2>
      <p className='about-block__text'>{props.text}</p>
    </div>
  )
}
