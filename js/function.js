const cartas = document.querySelectorAll(".card");
let cartaUm;
let cartaDois;
let cartaVirou = false; // checa se uma carta está virada
let desabilitarJogada = false; // desabilita jogada para prevenir que o jogador abra + de 2 cartas durante 1 turno
let jogadas = 0;
let paresDescobertos = 0;
let qtde = 0;

qtdeDeCartas();

function qtdeDeCartas() {
  qtde = prompt("Escolha um número de cartas entre 4 e 14");
  4;
  console.log(cartas);
  if (qtde <= 14 && qtde >= 4 && qtde % 2 == 0) {
    for (let ii = qtde; ii < 14; ii++) {
      cartas[ii].remove();
    }
  } else qtdeDeCartas();
}

function virarCarta() {
  if (desabilitarJogada) return;
  if (this === cartaUm) return;

  this.classList.add("flip");

  if (!cartaVirou) {
    cartaVirou = true;
    cartaUm = this;

    return;
  }

  cartaDois = this;
  checarSeSaoIguais();
}

function checarSeSaoIguais() {
  let saoIguais = cartaUm.dataset.parrot === cartaDois.dataset.parrot;
  jogadas++;
  saoIguais ? desabilitarCartas() : desvirarCartas();
}

function desvirarCartas() {
  desabilitarJogada = true;
  setTimeout(() => {
    cartaUm.classList.remove("flip");
    cartaDois.classList.remove("flip");
    resetarVars();
  }, 1000);
}

// desabilita jogada para prevenir que o
// jogador abra + de 2 cartas durante 1 turno
function desabilitarCartas() {
  paresDescobertos++;
  console.log(paresDescobertos);
  cartaUm.removeEventListener("click", virarCarta);
  cartaDois.removeEventListener("click", virarCarta);
  resetarVars();

  checaSeGanhou();
}

function resetarVars() {
  cartaVirou = false;
  desabilitarJogada = false;
  cartaUm = null;
  cartaDois = null;
}
function checaSeGanhou() {
  if (paresDescobertos == qtde / 2) {
    setTimeout(() => {
      alert(`Você ganhou em ${jogadas} jogadas!`);
      jogarNovamente();
    }, 1000);
  }
}

function jogarNovamente() {
  const resposta = prompt("Gostaria de jogar novamente?");
  if (resposta == "sim") {
    location.reload();
  }
}

(function shuffle() {
  cartas.forEach((card) => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
})();

cartas.forEach((card) => card.addEventListener("click", virarCarta));
