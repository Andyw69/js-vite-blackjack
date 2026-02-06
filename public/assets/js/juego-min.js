import e from "./underscore-min.js";
let miModulo = (() => {
  "use strict";
  let t = [],
    l = ["C", "D", "H", "S"],
    r = ["A", "J", "Q", "K"],
    a = [],
    o = document.querySelector("#btnPedir"),
    n = document.querySelector("#btnDetener"),
    d = document.querySelector("#btnNuevo"),
    u = document.querySelectorAll(".divCartas"),
    s = document.querySelectorAll("small"),
    i = (e = 2) => {
      (t = c()), (a = []);
      for (let l = 0; l < e; l++) a.push(0);
      s.forEach((e) => (e.innerText = 0)),
        u.forEach((e) => (e.innerHTML = "")),
        (o.disabled = !1),
        (n.disabled = !1),
        console.log({ puntosJugadores: a });
    },
    c = () => {
      t = [];
      for (let a = 2; a <= 10; a++) for (let o of l) t.push(a + o);
      for (let n of l) for (let d of r) t.push(d + n);
      return e.shuffle(t);
    },
    $ = () => {
      if (0 === t.length) throw Error("No hay cartas en la baraja");
      return t.pop();
    },
    _ = (e) => {
      let t = e.slice(0, -1);
      return isNaN(t) ? ("A" === t ? 11 : 10) : 1 * t;
    },
    b = (e, t) => ((a[t] = a[t] + _(e)), (s[t].innerText = a[t]), a[t]),
    f = (e, t) => {
      let l = document.createElement("img");
      (l.src = `assets/cartas/${e}.png`),
        l.classList.add("carta"),
        u[t].append(l);
    },
    p = () => {
      let [e, t] = a;
      setTimeout(() => {
        t <= 21 && t > e
          ? alert("Gana el bot jajaja que burro")
          : t > 21
          ? alert("Gana el jugador")
          : t === e
          ? alert("Gano el bot por empate!!!")
          : alert("Gano el bot");
      }, 100);
    },
    h = (e) => {
      let t = 0;
      do {
        let l = $();
        (t = b(l, a.length - 1)), f(l, a.length - 1);
      } while (t < e && e <= 21);
      p();
    };
  return (
    o.addEventListener("click", () => {
      let e = $(),
        t = b(e, 0);
      f(e, 0),
        t > 21
          ? (console.warn("Pasa tu plata, perdiste"),
            (o.disabled = !0),
            (n.disabled = !0),
            h(t))
          : 21 === t &&
            (console.warn("21 Siuuuuuuuuu"),
            (o.disabled = !0),
            (n.disabled = !0),
            h(t));
    }),
    n.addEventListener("click", () => {
      (o.disabled = !0), (n.disabled = !0);
      let e = a[0];
      h(e);
    }),
    d.addEventListener("click", () => {
      i();
    }),
    { nuevoJuego: i }
  );
})();
export default miModulo;
