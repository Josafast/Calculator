function operaciones(){

	const language = navigator.language.split("-")[0];

	document.querySelector(".about").firstElementChild.innerHTML = language == "es" ? `Todos los derechos reservados para "Ionic" y el uso de sus iconos "Ion-icons" &#169; <b class="year"></b>` : `Copyright "Ionic" and the use of its icons "Ion-icons" &#169; <b class="year"></b>`;
	document.querySelector(".year").innerHTML = new Date().getFullYear();

	if (document.body.clientWidth <= 460) {
		document.querySelector(".darkMode").setAttribute("style",`width:${document.querySelectorAll(".buttons")[0].clientWidth}px !important;height:${document.querySelectorAll(".buttons")[0].clientHeight}px !important;`);
		document.querySelector(".about-button").setAttribute("style",`width:${document.querySelectorAll(".buttons")[0].clientWidth}px !important;height:${document.querySelectorAll(".buttons")[0].clientHeight}px !important;`);
	}
	else {
		document.querySelector(".about-button").removeAttribute("style");
		document.querySelector(".darkMode").removeAttribute("style");
	}

	document.querySelector(".about-button").addEventListener("click",()=>{
		document.querySelector(".about").classList.toggle("showed");
	});

	document.querySelector(".darkMode").addEventListener("click",()=>{
		document.querySelector(".body").classList.toggle("dark-mode");
		localStorage.setItem("DarkMode",localStorage.getItem("DarkMode") == "false" ? "true" : "false");
	});

	let operation = 
	{
		reboot: false,
		parenthesis: true,
		simbol:false,
		decimal:true,
		exponent:false,
		numberVia:true,
		sqcb:false
	};
	let aux = true;
	let lastText = "";
	let text = document.getElementById("text");
	let buttons = document.querySelectorAll(".buttons");

function result(){
	operation["exponent"] = false;
		let valor1 = "";
		let regex = /[⁰¹ᒾ³⁴⁵⁶⁷⁸⁹]/i;
		let regex2 = /[+-/*÷]/i;
		let array = ["⁰","¹","ᒾ","³","⁴","⁵","⁶","⁷","⁸","⁹"]
		for (let i=0; i < text.value.length; i++){
			valor1 += text.value[i] == "÷" ? "/" : 
			(text.value[i+1] == "√" && text.value[i] == "³") ? "Math.cbrt" : 
			(text.value[i] == "√" && text.value[i-1] != "³") ? "Math.sqrt" :
			((text.value[i] == "√" && text.value[i-1] == "³") || (text.value[i] == "-" && text.value[i-1] == "(")) ? "" : 
			(text.value[i].search(regex) == 0 && text.value[i-1].search(regex) == -1) ? `**${array.indexOf(text.value[i])}` :
			(text.value[i].search(regex) == 0 && text.value[i-1].search(regex) == 0) ? `${array.indexOf(text.value[i])}` :
			(text.value[i] == "(" && text.value[i+1] == "-") ? "(-1*" :
			(text.value[i].search(regex2) == -1 && (text.value[i+1] == "(" || text.value[i+1] == "√")) ? `${text.value[i]}*` :
			text.value[i]; 
		}
		console.log(valor1);
		try {
			valor1 = eval(valor1);
		} catch (e) {
			let error = e.toString();
			if (error.includes("missing ) after argument list")){
				valor1+=")";
				valor1 = eval(valor1);
			}
		}
		console.log(valor1);
		lastText = "";
		text.value = valor1.toString() == "Infinity" ? "Not calculable" : valor1;

		valor1 = text.value;

		try {
			if (text.value.split(".")[1]){
				let Ei = text.value.split(".")[1];
				Ei = Ei.includes("e") ? Ei.split("e")[0].slice(0,3) + "e" + Ei.split("e")[1] : Ei.slice(0,3);
				text.value = text.value.indexOf(".") ? text.value.split(".")[0] + "." + Ei : text.value;	
				valor1 = text.value;
			}
		} catch (e) {}
		
		operation['reboot'] = true;
}

function number(num){
	let array = ["⁰","¹","ᒾ","³","⁴","⁵","⁶","⁷","⁸","⁹"];

	if (operation["numberVia"] == true) {
		if (operation['reboot']) text.value='';

		if(operation["exponent"] == true){
			operation["decimal"] = false;
			text.value += array[num];
		} else {
			text.value += num;
		}
		operation["simbol"] = true;
		operation['reboot'] = false;
		lastText = "";
	}
}

function simbol(sim){
	if(operation["simbol"] == true){
		text.value += sim;
		lastText = "";
		operation["simbol"] = false;
		operation["decimal"] = true;
		operation["exponent"] = false;
		operation["numberVia"] = true;
		operation['reboot'] = false;
	}
}

function guardar(){
	buttons.forEach(button=>{
		button.addEventListener("click",()=>{
			if (button.textContent == "√"){
				operation['reboot'] = false;
				if (operation["sqcb"] == false){
					operation["sqcb"] = true;
					operation["parenthesis"] = false;
					text.value += "√(";
				} else {
					text.value += ")";
					operation["sqcb"] = false;
					operation["exponent"] = false;
					operation["numberVia"] = false;
				}
			} else if (button.textContent == "³√"){
				operation['reboot'] = false;
				if (operation["sqcb"] == false){
					operation["sqcb"] = true;
					operation["parenthesis"] = false;
					text.value += "³√(";
				} else {
					text.value += ")";
					operation["sqcb"] = false;
					operation["exponent"] = false;
					operation["numberVia"] = false;
				}
			} else if (button.textContent == "xⁿ"){
				if(operation["simbol"] == true){
					if(operation["exponent"] == false){	
						operation["decimal"] = false;
						operation["exponent"] = true;
					}
				}
			} else if (button.textContent == "÷" || button.textContent == "*" || button.textContent == "-" || button.textContent == "+"){
				simbol(button.textContent);
			} else if (button.textContent == "±"){
				let array = ["⁰","¹","ᒾ","³","⁴","⁵","⁶","⁷","⁸","⁹"];
				if (text.value.length >=1){
					if (parseInt(text.value[text.value.length-1]) >= 0 && parseInt(text.value[text.value.length-1]) || array.includes(text.value[text.value.length-1]) <= 9){
						if (lastText == ""){
							let regex = /[+-/*(]/i;
							lastText = text.value;
							text.value = text.value.replace(text.value.split(regex)[text.value.split(regex).length-1],`(-${text.value.split(regex)[text.value.split(regex).length-1]})`);
							operation["numberVia"] = false;
						} else {
							[lastText, text.value] = [text.value, lastText];
							operation["numberVia"] = operation["numberVia"] == true ? false : true
						}
					}
				}
			} else if (parseInt(button.textContent) >= 0 && parseInt(button.textContent) <= 9){
				number(button.textContent);
			} else if (button.textContent == "."){
				if(operation["decimal"] == true){
					operation["decimal"] = false;
					text.value += ".";
				}
			} else if (button.textContent == "="){
				result();
			} else if (button.textContent == "C"){
				lastText = "";
				operation["numberVia"] = true;
				operation["exponent"] = false;
				operation["simbol"] = false;
				operation["decimal"] = true;
				operation["sqcb"] = false;
				operation['reboot'] = false;
				text.value = "";
			} else if (button.id == "BACK"){
				text.value = text.value.substring(0,text.value.length-1);
			} else if (button.textContent == "()") {
				text.value += operation["parenthesis"] == true ? "(" : ")";
				operation["sqcb"] = false;
				operation["parenthesis"] = operation["parenthesis"] == true ? false : true;
				operation["numberVia"] = operation["parenthesis"] == true ? false : true; 
				operation['reboot'] = false;
			} 

			if (text.value != "") {
				document.querySelector(".about-button").classList.add("d-none");
			} else document.querySelector(".about-button").classList.remove("d-none");
		})
	})
}

	guardar();

	window.addEventListener("keydown",(e)=>{
		let regex = /[()+*-/.0-9]/i;

		if (e.key == "Enter"){
			result();
		} else if (e.key == "Backspace"){
			text.value = text.value.substring(0,text.value.length-1);
		} else if (e.key.search(regex) == 0){
			text.value += e.key == "/" ? "÷" : e.key;
		}

		if (text.value != "") {
			document.querySelector(".about-button").classList.add("d-none");
		} else document.querySelector(".about-button").classList.remove("d-none");
	});
}

if (!localStorage.getItem("DarkMode")){
	localStorage.setItem("DarkMode","false");
} else {
	if (localStorage.getItem("DarkMode") == "true"){
		document.querySelector(".body").classList.add("dark-mode");	
	}
}

window.addEventListener("load",operaciones);

window.addEventListener("resize",()=>{
	if (document.body.clientWidth <= 460) {
		document.querySelector(".darkMode").setAttribute("style",`width:${document.querySelectorAll(".buttons")[0].clientWidth}px !important;height:${document.querySelectorAll(".buttons")[0].clientHeight}px !important;`);
		document.querySelector(".about-button").setAttribute("style",`width:${document.querySelectorAll(".buttons")[0].clientWidth}px !important;height:${document.querySelectorAll(".buttons")[0].clientHeight}px !important;`);
	}
	else {
		document.querySelector(".darkMode").removeAttribute("style");
		document.querySelector(".about-button").removeAttribute("style");
	}
});