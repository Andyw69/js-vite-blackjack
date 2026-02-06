import _ from "underscore";

/**
 * 2C = 2 of Clubs (Tréboles)
 * 2D = 2 of Diamonds (Diamantes)
 * 2H = 2 of Hearts (Corazones)
 * 2S = 2 of Spades (Picas)
 */

let deck = [];
const tipos = ["C", "D", "H", "S"],
  especiales = ["A", "J", "Q", "K"];

// let puntosJugador = 0,
//     puntosComputadora = 0;
let puntosJugadores = [];

// Referencias HTML
const btnPedir = document.querySelector("#btnPedir"),
  btnDetener = document.querySelector("#btnDetener"),
  btnNuevo = document.querySelector("#btnNuevo");

const /* divCartasJugador     = document.querySelector('#jugador-cartas'),
          divCartasComputadora = document.querySelector('#computadora-cartas'), */
  divCartasJugadores = document.querySelectorAll(".divCartas"),
  puntosHTML = document.querySelectorAll("small");

// Esta funcion inicializa el juego
const inicializarJuego = (numJugadores = 2) => {
  deck = crearDeck();

  puntosJugadores = [];
  for (let i = 0; i < numJugadores; i++) {
    puntosJugadores.push(0);
  }

  puntosHTML.forEach((elem) => (elem.innerText = 0));

  // puntosHTML[0].innerText = 0;
  // puntosHTML[1].innerText = 0;

  divCartasJugadores.forEach((elem) => (elem.innerHTML = ""));
  // divCartasJugador.innerHTML = '';
  // divCartasComputadora.innerHTML = '';
  // // crearDeck();

  btnPedir.disabled = false;
  btnDetener.disabled = false;

  console.log({ puntosJugadores });
};

// Esta función crea un nuevo deck o baraja
const crearDeck = () => {
  deck = [];
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }

  return _.shuffle(deck);
};

// Esta función me permite tomar una carta
const pedirCarta = () => {
  // console.log({deck});
  // if(indice < 0 || indice >= deck.length){
  //     throw new Error(`Indice ${indice} fuera de rango! Validos: 0 - ${deck.length - 1}`);
  // }
  // for(let i = indice; i < deck.length - 1; i++){ //
  //     deck[i] = deck[i + 1];
  // }
  // deck.length = deck.length - 1; // Reducir el tamaño del arreglo en 1

  // console.log(deck);
  // console.log('funciona porfavor :"(');
  // return deck;

  if (deck.length === 0) {
    throw new Error("No hay cartas en la baraja");
  }
  // const carta = deck.pop(); // Usar esto si no funciona el otro xd Esta línea remueve la última carta del deck y la retorna. Forma más sencilla de hacerlo con métodos de arreglos

  // console.log(deck);
  // console.log(carta);
  console.log(deck);
  return deck.pop();
};

//pedirCarta();

/* const valorCarta = ( carta ) => {
        const valor = carta.slice(0, -1);
        console.log({valor});

        let puntos = 0;
        if( isNaN(valor) ){
            puntos = ( valor === 'A' ) ? 11 : 10;
        } else{
            puntos = valor * 1;
        }
        console.log(puntos);
    }

    valorCarta('QD'); */

const valorCartav2 = (carta) => {
  const valor = carta.slice(0, -1);

  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

// Nueva funcion optimizando codigo de turnoComputadora
// Turno: 0 = primer jugador y el último será la computadora
const acumularPuntos = (carta, turno) => {
  puntosJugadores[turno] = puntosJugadores[turno] + valorCartav2(carta);
  puntosHTML[turno].innerText = puntosJugadores[turno];
  return puntosJugadores[turno];
};

// funcion para crear las imagenes de las cartas
const crearCarta = (carta, turno) => {
  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  divCartasJugadores[turno].append(imgCarta);
};

// determinamos el ganador con setTimeout
const determinarGanador = () => {
  const [puntosJugador, puntosComputadora] = puntosJugadores;

  setTimeout(() => {
    if (puntosComputadora <= 21 && puntosComputadora > puntosJugador) {
      alert("Gana el bot jajaja que burro");
    } else if (puntosComputadora > 21) {
      alert("Gana el jugador");
    } else if (puntosComputadora === puntosJugador) {
      alert("Gano el bot por empate!!!");
    } else {
      alert("Gano el bot");
    }
  }, 100);
};

// Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
  let puntosComputadora = 0;
  do {
    const carta = pedirCarta();

    puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);

    // <img class="carta" src="assets/cartas/2H.png" alt="">
    // const imgCarta = document.createElement('img');
    // imgCarta.src = `assets/cartas/${ carta }.png`;
    // imgCarta.classList.add('carta');
    // divCartasComputadora.append( imgCarta );

    // Reemplazo las lineas anteriores por funcion
    crearCarta(carta, puntosJugadores.length - 1);

    // if ( puntosComputadora >= 21 ) break;
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

  determinarGanador();
};

// Eventos
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();

  const puntosJugador = acumularPuntos(carta, 0);
  // puntosJugador = puntosJugador + valorCartav2(carta);
  // puntosHTML[0].innerText = puntosJugador;

  // <img class="carta" src="assets/cartas/2H.png" alt="">
  // const imgCarta = document.createElement('img');
  // imgCarta.src = `assets/cartas/${ carta }.png`;
  // imgCarta.classList.add('carta');
  // divCartasJugador.append( imgCarta );

  crearCarta(carta, 0);

  if (puntosJugador > 21) {
    console.warn("Pasa tu plata, perdiste");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn("21 Siuuuuuuuuu");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
  // console.log( puntosJugador);
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;

  const puntosJugador = puntosJugadores[0];

  turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener("click", () => {
  inicializarJuego();
});



// TODO: borrar
// console.log(16);
// turnoComputadora(16);

/* // Intentando convertir String to Array
// let nuevaList= pruebaSlice.slice(0, - 1);
const convertStringToArray = (string) => {
    let newPruebaSlice = [];
    for ( let i = 0; i < string.length; i++ ){
        newPruebaSlice.push(string[i]);
    }
    return newPruebaSlice;
}
// const miString = convertStringToArray(pruebaSlice);
// console.log(miString);

//---------------------------
const convertStringToArray2 = (string) => {
    let newPruebaSlice = [];
    for ( let i = 0; i < string.length; i++ ){
        console.log(string[i]);
        newPruebaSlice[i] = string[i];
    }
    return newPruebaSlice;
}
let lastValue = convertStringToArray2('10D');
let lastElement;
for(let i = 0; i < lastValue.length; i++){
    lastElement = lastValue[i];
}
console.log(`El ultimo elemento es ${lastElement}`); */

/* const arrayPrueba = [ 1, 2, 3, 4, 5 ];
const pruebaELiminar = (index) => {
    for(let i = index; i < arrayPrueba.length; i++ ){
        arrayPrueba[i] = arrayPrueba[i + 1];
    }
    arrayPrueba.length = arrayPrueba.length - 1;
    console.log(arrayPrueba);
    return arrayPrueba;
}
pruebaELiminar(2); */
