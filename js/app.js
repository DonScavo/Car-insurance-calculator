//Cotizar seguro

function Seguro(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function (informacion) {

    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.3;
            break;
    }

    // Leer el año
    const diferencia = new Date().getFullYear() - this.anio;
    // Cada año de diferencia hay que reducir 3% el valor del seguro
    cantidad -= ((diferencia * 3) * cantidad) / 100;
    /*
    Si el seguro es basico se le aumenta el 30%
    si el seguro es completo se le aumenta el 50%
    */
    if (this.tipo === 'basico') {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }
    return cantidad;
}

// Todo lo que se mustra
function Interfaz() {
}


Interfaz.prototype.mostrarMensaje = function (mensaje, tipo) {
    const div = document.createElement('div');

    if (tipo === 'error') {
        div.classList.add('mensaje', 'error');
    } else {
        div.classList.add('mensaje', 'correcto');
    }
    div.innerHTML = `${mensaje}`;
    formulario.insertBefore(div, document.querySelector('.form-group'));
    setTimeout(function () {
        document.querySelector('.mensaje').remove();
    }, 3000);
}

// Imprime el resultado de la cotización

Interfaz.prototype.mostrarResultado = function (seguro, cantidad) {
    const resultado = document.getElementById('resultado');
    let marca;
    console.log(seguro);

    switch (seguro.marca) {
        case '1':
            marca = 'Americano';
            break;
        case '2':
            marca = 'Asiatico';
            break;
        case '3':
            marca = 'Europeo';
            break;

    }

    // Crear un div
    const div = document.createElement('div');
    // Insertar la información
    div.innerHTML = `
    <p class="header">Tu resumen: </p>
    <p> Marca: ${marca} </p>
    <p> Año: ${seguro.anio} </p>
    <p> Tipo: ${seguro.tipo} </p>
    <p> Total: $ ${cantidad} </p>
    `;

    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';
    setTimeout(function () {
        spinner.style.display = 'none';
        resultado.appendChild(div);
    }, 2000);


}




// Event listeners

const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    // Leer la marca seleccionada del select
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    // Leer el año seleccionado del select
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    // leer el valor del radio button
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    // Crear instancia de Interfaz
    const interfaz = new Interfaz();

    // Revisamos que los campos no esten vacios

    if (marcaSeleccionada === '' || anioSeleccionado === '' || tipo === '') {
        // Interfaz imprimiendo un error
        interfaz.mostrarMensaje('Faltan datos, revisar el formulario y prueba de nuevo', 'error');
        console.log('Faltan Datos');

    } else {
        // Limpiar resultados anteriores
        const resultados = document.querySelector('#resultado div');
        if (resultados != null) {
            resultados.remove();
        }



        // Instanciar seguro y mostrar interfaz
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);

        // Cotizar el seguro
        const cantidad = seguro.cotizarSeguro(seguro);

        // Mostrar el resultado
        interfaz.mostrarResultado(seguro, cantidad);
        interfaz.mostrarMensaje('Cotizandoo...', 'exito');

    }

});


const maxYear = new Date().getFullYear();
const minYear = maxYear - 20;

let SelectAnios = document.getElementById('anio');


for (let i = maxYear; i >= minYear; i--) {

    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    SelectAnios.appendChild(option);

}