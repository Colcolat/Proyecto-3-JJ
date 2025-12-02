# Implementación del Cifrado Hill

Este repositorio contiene la implementación del Cifrado Hill, un algoritmo de criptografía de sustitución poligráfica basado en álgebra lineal. El proyecto permite tanto encriptar como desencriptar mensajes utilizando una matriz clave de 2x2.

## Información del Alumno
* **Nombre Completo:** Juan José Zapata Buenfil
* **Grupo:** 1B
* **Materia:** Fundamentos de algebra

## Descripción del Proyecto
La aplicación es una herramienta web que permite al usuario procesar texto plano mediante operaciones matriciales. 

### Funcionalidades
1. **Encriptar:** Toma un mensaje de texto y lo transforma utilizando una matriz clave ingresada por el usuario.
2. **Desencriptar:** Realiza el proceso inverso para recuperar el mensaje original, calculando la matriz inversa modular.

## Instrucciones de Uso
1. Abre la página web (index.html).
2. Escribe el mensaje que deseas cifrar en el campo de texto.
3. Ingresa los 4 números correspondientes a la matriz clave (2x2).
   * Nota: Para que el mensaje se pueda desencriptar, el determinante de la matriz debe ser coprimo con 26.
4. Presiona "Encriptar" para ver el resultado cifrado.
5. Para volver al texto original, asegúrate de tener el mensaje cifrado en la pantalla y presiona "Desencriptar" con la misma clave.

## Matemáticas Detrás de la Implementación
El sistema utiliza el alfabeto inglés de 26 caracteres (A=0, ..., Z=25).

### Encriptación
Se utiliza la fórmula: 
C = K * P (mod 26)
Donde C es el vector cifrado, K es la matriz clave y P es el vector de texto plano.

### Desencriptación
Se utiliza la fórmula:
P = K⁻¹ * C (mod 26)

Para obtener K⁻¹ (la matriz inversa) en módulo 26, el algoritmo realiza los siguientes pasos matemáticos en el código:
1. **Cálculo del Determinante:** det = (ad - bc).
2. **Módulo positivo:** Se ajusta el determinante para manejar números negativos correctamente.
3. **Inverso Modular:** Se busca un número 'x' tal que (det * x) % 26 = 1. Si no existe, la matriz no es válida.
4. **Matriz de Adjuntos:** Se aplica la matriz adjunta multiplicada por el inverso del determinante para obtener la matriz de desencriptación.

## Personalización
El proyecto cuenta con una interfaz gráfica (GUI) desarrollada en HTML y CSS para facilitar la interacción del usuario, mostrando visualmente cómo se agrupan los caracteres en matrices.

## Despliegue
La aplicación se encuentra disponible en la siguiente URL pública:
[https://colcolat.github.io/Proyecto-3-JJ/]

---

## Código Agregado para Desencriptación

A continuación se muestra el fragmento de código JavaScript añadido para lograr la funcionalidad de desencriptado (Cálculo de inversa modular y multiplicación):

```javascript
// Funciones matemáticas auxiliares necesarias para desencriptar
function mod(n, m) {
    return ((n % m) + m) % m;
}

function inversoModular(a, m) {
    a = mod(a, m);
    for (let x = 1; x < m; x++) {
        if (mod(a * x, m) === 1) return x;
    }
    return -1;
}

// Lógica del botón Desencriptar
btnDesencriptar.addEventListener('click', () => {
    // 1. Obtener la clave
    const key = [
        [parseInt(k11.value) || 0, parseInt(k12.value) || 0],
        [parseInt(k21.value) || 0, parseInt(k22.value) || 0]
    ];

    // Validaciones omitidas por brevedad...

    const texto = mensaje.value.toUpperCase().replace(/[^A-Z]/g, '');

    // 2. Calcular Determinante
    let det = (key[0][0] * key[1][1] - key[0][1] * key[1][0]);
    det = mod(det, 26); 

    // 3. Obtener Inverso Modular del Determinante
    const detInv = inversoModular(det, 26);

    if (detInv === -1) {
        resultado.textContent = `Error: No se puede desencriptar.`;
        return;
    }

    // 4. Calcular Matriz Inversa: K^-1 = detInv * Adj(K) mod 26
    const d = key[1][1];
    const b = key[0][1];
    const c = key[1][0];
    const a = key[0][0];

    const invK = [
        [mod(d * detInv, 26), mod(-b * detInv, 26)],
        [mod(-c * detInv, 26), mod(a * detInv, 26)]
    ];

    // 5. Proceso de Desencriptado
    let numeros = texto.split('').map(char => char.charCodeAt(0) - 65);
    if (numeros.length % 2 !== 0) numeros.push(23); 

    let desencriptado = '';
    for (let i = 0; i < numeros.length; i += 2) {
        const v1 = numeros[i];
        const v2 = numeros[i + 1];
        
        const p1 = mod(invK[0][0] * v1 + invK[0][1] * v2, 26);
        const p2 = mod(invK[1][0] * v1 + invK[1][1] * v2, 26);
        
        desencriptado += String.fromCharCode(65 + p1);
        desencriptado += String.fromCharCode(65 + p2);
    }
    
    resultado.textContent = desencriptado;
});
´´´
