import { useState } from 'react';
import { evaluate } from 'mathjs';
import sunny from './images/svg/sunny.svg'; import moon from './images/svg/moon.svg';
import close from './images/svg/close.svg'; import help from './images/svg/help-outline.svg';
import Boton from './components/boton.js';

let buttonsContent = ['√','³√','xⁿ','÷','7','8','9','*','4','5','6','-','1','2','3','+','±','0','.','=','()','C','back'];

export default function App({screem}) {
  const [scrEEn, setScreen] = useState(screem);
  const [opValue, setOpValue] = useState({
    decimal:true,
    exponent:false,
    numberVia:true,
    lastText: '',
    parenthesis: true,
    reboot: false,
		simbol:false,
		sqcb:false
  });

  function pressButton (button){
    let text = document.querySelector('.text');
    let oP = opValue;

    if (button === 'back'){
      text.value = text.value.substring(0,text.value.length-1);
      if (text.value === ''){
        oP = {
          decimal:true,
          exponent:false,
          numberVia:true,
          lastText: '',
          parenthesis: true,
          reboot: false,
          simbol:false,
          sqcb:false
        };
      }
    } else if (parseInt(button) >= 0){
      let array = ["⁰","¹","ᒾ","³","⁴","⁵","⁶","⁷","⁸","⁹"];
      
      if (opValue.numberVia) {
        oP.parenthesis = oP.parenthesis === 'med' ? false : oP.parenthesis ;
        oP.simbol = true; oP.lastText = '';

        if (opValue.reboot) {text.value = ''; oP.reboot = false}
      
        if(opValue.exponent){
          oP.decimal = false;
          text.value += array[button];
        } else {
          text.value += button;
        }
      }
    } else if (button === '.') {
      if (oP.decimal){ 
        oP.decimal = false;
        text.value += ".";
      }
    } else if (button === '÷' || button === '*' || button === '-' || button === '+'){
      if (oP.simbol){
        text.value += button;
        oP = {
          decimal: true,
          exponent: false,
          numberVia: true,
          lastText: '',
          parenthesis: 'med',
          reboot: false,
		      simbol: false,
		      sqcb: oP.sqcb
        };
      }
    } else if (button === 'C'){
      oP = {
        decimal:true,
        exponent:false,
        numberVia:true,
        lastText: '',
        parenthesis: true,
        reboot: false,
        simbol: false,
        sqcb: false
      };
			text.value = '';
    } else if (button === '()'){
      text.value += oP.parenthesis === true ? "(" : oP.parenthesis === false ? ")" : '';
      oP = {
        decimal: oP.decimal,
        exponent:oP.exponent,
        numberVia: oP.parenthesis === true ? true : oP.parenthesis === false ? false : oP.numberVia,
        lastText: '',
        parenthesis: oP.parenthesis === true ? false : oP.parenthesis === false ? true : oP.parenthesis ,
        reboot: false,
        simbol: oP.simbol,
        sqcb: false
      };
    } else if (button === '√' || button === '³√'){
      oP.reboot = false;
      text.value += oP.sqcb === false ? `${button}(` : ')';
      oP.parenthesis = oP.sqcb === false ? false : oP.parenthesis;
      oP.exponent = oP.sqcb === true ? false : oP.exponent;
      oP.numberVia = oP.sqcb === true ? false : oP.exponent;
      oP.sqcb = oP.sqcb === false ? true : false;
    } else if (button === "xⁿ"){
      if(oP.simbol){
        if(oP.exponent === false){	
          oP.decimal = false;
          oP.exponent = true;
        }
      }
    } else if (button === "±"){
      let array = ["⁰","¹","ᒾ","³","⁴","⁵","⁶","⁷","⁸","⁹"];
      if (text.value.length >=1){
        if (((parseInt(text.value[text.value.length-1]) >= 0) && (parseInt(text.value[text.value.length-1]))) || (array.includes(text.value[text.value.length-1]) <= 9)){
          if (oP.lastText === ""){
            let regex = /[+-/*(]/i;
            oP.lastText = text.value;
            text.value = text.value.replace(text.value.split(regex)[text.value.split(regex).length-1],`(-${text.value.split(regex)[text.value.split(regex).length-1]})`);
            oP.numberVia = false;
          } else {
            [oP.lastText, text.value] = [text.value, oP.lastText];
            oP.numberVia = oP.numberVia === true ? false : true;
          }
        }
      }
    } else if (button === '='){
      oP.parenthesis = true;
      oP.exponent = false;
		  let valor1 = "";
		  let regex = /[⁰¹ᒾ³⁴⁵⁶⁷⁸⁹]/i;
		  let regex2 = /[+-/*÷]/i;
		  let array = ["⁰","¹","ᒾ","³","⁴","⁵","⁶","⁷","⁸","⁹"]
		  for (let i=0; i < text.value.length; i++){
			  valor1 += text.value[i] === "÷" ? "/" : 
			  (text.value[i+1] === "√" && text.value[i] === "³") ? "Math.cbrt" : 
			  (text.value[i] === "√" && text.value[i-1] !== "³") ? "Math.sqrt" :
			  ((text.value[i] === "√" && text.value[i-1] === "³") || (text.value[i] === "-" && text.value[i-1] === "(")) ? "" : 
			  (text.value[i].search(regex) === 0 && text.value[i-1].search(regex) === -1) ? `**${array.indexOf(text.value[i])}` :
			  (text.value[i].search(regex) === 0 && text.value[i-1].search(regex) === 0) ? `${array.indexOf(text.value[i])}` :
			  (text.value[i] === "(" && text.value[i+1] === "-") ? "(-1*" :
			  (text.value[i].search(regex2) === -1 && (text.value[i+1] === "(" || text.value[i+1] === "√")) ? `${text.value[i]}*` :
			  text.value[i]; 
		  }
		  try {
			  valor1 = eval(valor1);
		  } catch (e) {
			  let error = e.toString();
		  	if (error.includes("missing ) after argument list")){
			  	valor1+=")";
			  	valor1 = evaluate(valor1);
			  }
		  }
		  oP.lastText = '';
		  text.value = valor1.toString() === "Infinity" ? "Not calculable" : valor1;

		  valor1 = text.value;

		  try {
			  if (text.value.split(".")[1]){
				  let Ei = text.value.split(".")[1];
				  Ei = Ei.includes("e") ? Ei.split("e")[0].slice(0,3) + "e" + Ei.split("e")[1] : Ei.slice(0,3);
				  text.value = text.value.indexOf(".") ? text.value.split(".")[0] + "." + Ei : text.value;	
				  valor1 = text.value;
			  }
		  } catch (e) {}
		
		  oP.reboot = true;
    }

    if (text.value !== "") {
      document.querySelector(".about-button").classList.add("d-none");
    } else document.querySelector(".about-button").classList.remove("d-none");

    setOpValue(oP);
  };
  
  window.onresize = (e)=> setScreen([e.target.innerWidth,e.target.innerHeight]);

  const darkMode = ()=> {document.querySelector('.body').classList.toggle('dark-mode');localStorage.setItem("DarkMode",localStorage.getItem("DarkMode") === "false" ? "true" : "false");};
  const showAbout = ()=> document.querySelector('.about').classList.toggle('showed');

  return (
    <>
    <span className="darkMode" style={{width: (scrEEn[0] <= 460 ? `${scrEEn[0]/4}px` : 320 + 'px'),height: (scrEEn[0] <= 460 ? `${scrEEn[1]/7}px` : 40 + 'px')}} onClick={darkMode}>
		  <img className='sunny' src={sunny} alt='darkMode-off'/>
		  <img className='moon' src={moon} alt='darkMode-on'/>
	  </span>
	  <span className="about-button" style={{width: (scrEEn[0] <= 460 ? `${scrEEn[0]/4}px` : 320 + 'px'),height: (scrEEn[0] <= 460 ? `${scrEEn[1]/7}px` : 40 + 'px')}} onClick={showAbout}>
	  	<img className='help' src={help} alt='help'/>
	  	<img className='close' src={close} alt='close-help'/>
	  </span>
    <div className='calculator'>
      <input type='text' className='text' id='text' readOnly='readonly'/>
      {
        buttonsContent.map(boton=>{
          return <Boton key={boton.toString()} id={boton.toString()} clase='buttons' press={pressButton}>{boton}</Boton>
        })
      }
    </div>
    </>
  );
}