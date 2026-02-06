// Cuando estamos trabajando con modulos, es obvio que estamos trabajando con JS por las extensiones .js y ponerle la extension '.js' es opcional, no necesitamos ponerle el .js porque ya sabe que estamos trabajando con archivos de js por defecto y tambien el nombre index es opcional ponerlo porque asi como nosotros iniciamos el npm run dev nos dio el link 'localhost:5173' y esto lo que hace es "localhost:5173/index.html", no es necesario poner ese nombre por defecto porque el navegador ya busca ese archivo por defecto y lo mismo pasa con index.js. Si importamos solo hasta donde dice blackjack y no ponemos el /index.js buscara por defecto el index.js

import './blackjack/index.js';
import "./style.css";


