import React from 'react';
import Backspace from '../images/svg/backspace.svg';

function Boton({clase,children,press,id}){
  return (
    <button className={clase} id={id} onClick={(e)=> press(e.target.id)}>
      {id === 'back' ? <img src={Backspace} alt='Backspace' /> : children}
    </button>
  );
};

export default Boton;