import { crearDeck } from "./crear-deck.js";
// import { deck } from "../index.js";

/**
 * 
 * @param {Array<String>} deck es un arreglo de string
 * @returns {String} retorna la carta del deck
 */

// Esta función me permite tomar una carta
export const pedirCarta = (deck) => {

    
    if ( !deck || deck.length === 0 ) {
        throw new Error ('No hay cartas en el deck');
    }

    const carta = deck.pop();
    console.log(carta)
    return carta;
}