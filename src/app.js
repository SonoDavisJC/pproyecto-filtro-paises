import { countries } from './data.js';

const entrada = document.querySelector(".input-text");
const salidaPaieses = document.getElementById("main-paises");
const btnLetras = document.getElementById("btnLetras");
const btnPrimeraLetra = document.getElementById("btnPrimeraLetra");
const btnOrden = document.getElementById("btnOrdenar");
const textInfo = document.getElementById("info-texto");
const TotalPaises = document.getElementById("info-total");
const MensajeError = document.getElementById('error-msg');

TotalPaises.textContent = countries.length;


/**  Muestra Paises en Document HTML */
function MuestraPaises(arr) {
  for(const countrie of arr) {
      let $div = document.createElement("div");
      $div.className = "item-pais";
      $div.textContent = countrie;
      salidaPaieses.appendChild($div);
  }
}
document.addEventListener('DOMContentLoaded', MuestraPaises(countries));


function CantidadIncluida (valor, cantidad) {
    if(!valor.length > 0) return textInfo.innerHTML = "";
    textInfo.innerHTML = `Texto <span>${valor}</span> : tiene <span>${cantidad}</span> resultados`;
}

function ValidarCaracteresIngresados(valor) {
    let patronRegex = (/[$%&|<>#*¿?\/{}¡!|´'`+-.]|[0-9]/g);
    if(patronRegex.test(valor)){
        salidaPaieses.innerHTML = ""; 
        return MensajeError.textContent = 'No se permite carcteres especiales';
    }
    MensajeError.textContent = '';
    return true;
}


/* Para letras incluidas */
btnLetras.onclick = () => {
  btnLetras.classList.toggle("active");
  btnPrimeraLetra.classList.remove("active");
  
  function FiltrarPorLetrasIncluidas(valor) {
    salidaPaieses.innerHTML = ""; 

    let parameter = valor;
    let text = parameter.slice(0,1).toUpperCase() + parameter.slice(1).toLowerCase();

    let paises = countries.filter((a) => {
        return a.includes(text)
    });
    MuestraPaises(paises)
    CantidadIncluida(parameter, paises.length);

  };
  FiltrarPorLetrasIncluidas(entrada.value);
  
  entrada.addEventListener("input", event => {
    let letras = event.target.value;
    if(ValidarCaracteresIngresados(letras) === true){    
        FiltrarPorLetrasIncluidas(letras) 
    }
});
    ValidarSeleccionDeFiltro();
}


/* Para las primeras letras */
btnPrimeraLetra.onclick = () => {
  //salidaPaieses.innerHTML = ""; 
  btnPrimeraLetra.classList.toggle("active");
  btnLetras.classList.remove("active");

  function FiltroPrimerasLetras(valor) {
    salidaPaieses.innerHTML = ""; 
    let parameter = valor;
    let text = parameter.slice(0,1).toUpperCase() + parameter.slice(1).toLowerCase();

    let paises = countries.filter((a) => {
        return a.startsWith(text);
    });
    MuestraPaises(paises);
    CantidadIncluida(parameter, paises.length);
  }

  FiltroPrimerasLetras(entrada.value);

  entrada.addEventListener("input", (event) => {
    let letras = event.target.value
    if(ValidarCaracteresIngresados(letras) === true){    
      FiltroPrimerasLetras(letras);
    }
  });
  
    ValidarSeleccionDeFiltro();
}



/* Ordenar */
btnOrden.onclick = () => {
  let PaisesHT = document.querySelectorAll(".item-pais");
  btnOrden.classList.toggle("active");

  salidaPaieses.innerHTML = "";
  let NewArrItemPaises = [];

  for(const i of PaisesHT) {
      NewArrItemPaises.push(i.textContent);
  }

  NewArrItemPaises.reverse();
  MuestraPaises(NewArrItemPaises);
}


function ValidarSeleccionDeFiltro() {
    const opcionesFiltro = document.querySelectorAll('[role="filter"]')
    if(opcionesFiltro[0].className || opcionesFiltro[1].className){
        //console.log('Hay clases');
        entrada.removeAttribute('disabled');
        entrada.removeAttribute('placeholder');
        entrada.setAttribute('placeholder', 'Buscar');

    }
    else {
        entrada.setAttribute('disabled', '');
        entrada.setAttribute('placeholder', 'Elija un opción para efectuar su busqueda');
        entrada.value = "";
        textInfo.innerHTML = "";
        salidaPaieses.innerHTML = "";
        MuestraPaises(countries);
    }
}
ValidarSeleccionDeFiltro();