const kelvin=273.15;

const obtenerClima=()=>{
    let ciudad=document.querySelector("#ciudad").value;
    let pais=document.querySelector("#pais").value;

    if(ciudad.trim()==='' || pais.trim()===''){
        mostrarError("#msj-error","Campos Incompletos");
        return;
    }
    consultarAPI(ciudad,pais);
}


const consultarAPI= async(ciudad, pais) =>{
    const apiKey ="113a3c3ee50dddcee88942e31f1c2529"
    const url=`http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
    console.log(url);
    const respuesta=await fetch(url);
    const resultado=await respuesta.json();
    console.log(resultado);

    if(resultado.cod=="404"){
        mostrarError("#msj-error", "Error en resultados");
        return;
    }

    const {name, main}=resultado;
    if(!name) return null;

    let divResultado = document.querySelector("#divResultado");

    divResultado.innerHTML = `<div class="card-panel white col s12">
    <h4>El Clima de ${name} es: </h4>
    <p class="temperatura">
    ${parseFloat(main.temp-kelvin,10).toFixed(2)} <span> &#x2103;</span>
    </p>
    <p> Temperatura Máxima:
    ${parseFloat(main.temp_max-kelvin,10).toFixed(2)} <span> &#x2103;</span>
    </p>
    <p> Temperatura Mínima:
    ${parseFloat(main.temp_min-kelvin,10).toFixed(2)} <span> &#x2103;</span>
    </p>
    <p> Humedad:
    ${parseFloat(main.humidity,10).toFixed(2)} <span> %</span>
    </p>
    </div>
    </div>`;
}

const mostrarError=(elemento, mensaje) =>{
    divError=document.querySelector(elemento);
    divError.innerHTML=`<p class="red darken-4 error">${mensaje}</p>`;
    setTimeout(()=>{divError.innerHTML=``;}, 2000);

}


