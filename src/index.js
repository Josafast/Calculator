import React from 'react'; import ReactDOM from 'react-dom/client';
import './css/normalize.css'; import './css/style.css';
import jfast from './images/icons/jfastSFX.svg'; import githubLogo from './images/icons/logo-github.svg';
import App from './main';

if (!localStorage.getItem("DarkMode")){
	localStorage.setItem("DarkMode","false");
} else {
	if (localStorage.getItem("DarkMode") === "true"){
		document.querySelector(".body").classList.add("dark-mode");	
	}
}

const root = ReactDOM.createRoot(document.querySelector('.body'));
root.render(
  <React.StrictMode>
    <section className='about'>
     <p>Todos los derechos reservados para "Ionic" y el uso de sus iconos "Ion-icons" &#169; <b className="year">{new Date().getFullYear()}</b></p>
		  <a href="https://github.com/Josafast" target="_BLANK" rel='noreferrer'><img src={jfast} alt='jfast'/></a>
		  <a href="https://github.com/Josafast/Calculator"><img src={githubLogo} alt='github-logo'/></a>
    </section>
    <App screem={[window.innerWidth,window.innerHeight]} />
  </React.StrictMode>
);