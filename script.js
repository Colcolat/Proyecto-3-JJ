const mensaje = document.getElementById('mensaje');
const charCount = document.querySelector('.char-count');
const matrizMensaje = document.getElementById('matrizMensaje');
const k11 = document.getElementById('k11');
const k12 = document.getElementById('k12');
const k21 = document.getElementById('k21');
const k22 = document.getElementById('k22');
const btnEncriptar = document.getElementById('encriptar');
const btnDesencriptar = document.getElementById('desencriptar');
const resultado = document.getElementById('resultado');

let textoOriginalGuardado = "";

mensaje.addEventListener('input', () => {
    const len = mensaje.value.length;
    charCount.textContent = `${len}/30`;
    mostrarMatrizMensaje();
});

function mostrarMatrizMensaje() {
    const texto = mensaje.value.toUpperCase().replace(/[^A-Z]/g, '');
    
    if (texto.length === 0) {
        matrizMensaje.textContent = 'Escribe un mensaje primero...';
        return;
    }

    const valores = texto.split('').map(char => char.charCodeAt(0) - 65);

    let matriz = '[';
    for (let i = 0; i < valores.length; i += 2) {
        if (i > 0) matriz += ' ';
        matriz += '[' + valores[i];
        if (i + 1 < valores.length) {
            matriz += ', ' + valores[i + 1];
        } else {
            matriz += ', 23';
        }
        matriz += ']';
    }
    matriz += ']';
    matrizMensaje.textContent = matriz;
}

function procesarHill(texto, key) {
    let numeros = texto.split('').map(c => c.charCodeAt(0) - 65);

    if (numeros.length % 2 !== 0) numeros.push(23);

    let salida = '';

    for (let i = 0; i < numeros.length; i += 2) {
        const v1 = numeros[i];
        const v2 = numeros[i + 1];

        const c1 = (key[0][0] * v1 + key[0][1] * v2) % 26;
        const c2 = (key[1][0] * v1 + key[1][1] * v2) % 26;

        const n1 = ((c1 % 26) + 26) % 26;
        const n2 = ((c2 % 26) + 26) % 26;

        salida += String.fromCharCode(65 + n1) + String.fromCharCode(65 + n2);
    }
    return salida;
}

function obtenerKey() {
    const key = [
        [parseInt(k11.value), parseInt(k12.value)],
        [parseInt(k21.value), parseInt(k22.value)]
    ];

    if (key.flat().some(v => Number.isNaN(v))) {
        resultado.textContent = "Error: La matriz clave tiene valores vacíos";
        resultado.classList.add('error');
        return null;
    }
    return key;
}

btnEncriptar.addEventListener('click', () => {
    resultado.textContent = '';
    resultado.classList.remove('error');

    textoOriginalGuardado = mensaje.value;
    
    const texto = mensaje.value;
    const soloLetras = texto.toUpperCase().replace(/[^A-Z]/g, '');

    if (soloLetras.length === 0) {
        resultado.textContent = "Ingresa un mensaje con letras";
        resultado.classList.add('error');
        return;
    }

    const key = obtenerKey();
    if (!key) return;

    resultado.textContent = procesarHill(soloLetras, key);
});

btnDesencriptar.addEventListener('click', () => {
    resultado.classList.remove('error');

    if (!textoOriginalGuardado) {
        resultado.textContent = "Primero debes encriptar un mensaje.";
        resultado.classList.add('error');
        return;
    }

    const textoLimpio = textoOriginalGuardado.toUpperCase().replace(/[^A-Z]/g, '');
    
    resultado.textContent = textoLimpio;
});

