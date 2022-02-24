let menu = document.querySelector("#menu");
let toggleIicon = document.querySelector("#toggle-icon");

toggleIicon.addEventListener("click", function() {
  menu.classList.toggle("menu-on");
});

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
	busqueda:  /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // 4 a 12 digitos.
	rango: /^[a-zA-Z0-9]{4,16}$/,
	juego:  /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // 7 a 14 numeros.
  disponibilidad:/^[a-zA-Z0-9]{4,16}$/,
  mensaje:  /^[a-zA-Z0-9]{10,16}$/
}

const campos = {
	usuario: false,
	nombre: false,
	busqueda: false,
	rango: false,
	juego: false,
  disponibilidad:false,
  mensaje: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "busqueda":
			validarCampo(expresiones.busqueda, e.target, 'busqueda');
		break;
		case "rango":
			validarCampo(expresiones.rango, e.target, 'rango');
		break;
		case "juego":
			validarCampo(expresiones.juego, e.target, 'juego');
		break;
    case "disponibilidad":
			validarCampo(expresiones.disponibilidad, e.target, 'disponibilidad');
		break;
    case "mensaje":
			validarCampo(expresiones.mensaje, e.target, 'mensaje');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.usuario && campos.nombre && campos.busqueda && campos.rango && campos.juego && campos.disponibilidad && campos.mensaje && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});