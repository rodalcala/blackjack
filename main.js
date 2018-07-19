let dlCards = [];
let plCards = [];
let dlScore = function() {
  let score = 0;
  for (let i = 0; i < dlCards.length; i++) {
    if (dlCards[i] === 10 || dlCards[i] === 11 || dlCards[i] === 12) {
      score += 10;
    } else if (dlCards[i] === 1) {
      score += 11;
    } else {
      score += dlCards[i];
    }
  }
  for (let i = 0; i < dlCards.length; i++) {
    if (score > 21 && dlCards[i] === 1) {
      score -= 10;
      // for loop para solucionar el valor del As y que cambie de 11 a 1
      // segun la ocacion
    }
  }
  //Print dealer score in html
  document.getElementById('dealerScore').textContent = score;
  return score;
};
let plScore = function() {
  let score = 0;
  for (let i = 0; i < plCards.length; i++) {
    if (plCards[i] === 10 || plCards[i] === 11 || plCards[i] === 12) {
      score += 10;
    } else if (plCards[i] === 1) {
      score += 11;
    } else {
      score += plCards[i];
    }
  }
  for (var i = 0; i < plCards.length; i++) {
    if (score > 21 && plCards[i] === 1) {
      score -= 10;
    }
  }
  //Print player score in html
  document.getElementById('playerScore').textContent = score;
  return score;
};

// Definimos el palo de cada carta
// function getSuit() {
//   let suit = Math.floor(Math.random() * 4);
//   if (suit === 0) {
//     return '♦️';
//   } else if (suit === 1) {
//     return '♣️';
//   } else if (suit === 2) {
//     return '♠️';
//   } else if (suit === 3) {
//     return '♥️';
//   }
// }

// Hasta aca definimos las variables que van a contener las cartas de cada
// jugador y los puntajes de cada uno (que dependen de las cartas)

function dlFirstCard() {
  let firstDl = Math.floor(Math.random() * 12) + 1;
  // generamos la primer carta del DL
  dlCards.push(firstDl);
  // la agregamos a la mano del DL
}

function plHand() {
  let firstPl = Math.floor(Math.random() * 12) + 1;
  let secondPl = Math.floor(Math.random() * 12) + 1;
  // generamos la dos primeras cartas del PL
  plCards.push(firstPl);
  plCards.push(secondPl);
  // las agragamos a la mano del PL
}

function printPl() {
  //Print player cards in html
  //Con un for loop, iteramos por todos los elementos del array plCards
  for (var i = 0; i < plCards.length; i++) {
    //Creamos un LI element
    var li = document.createElement('li');
    //Creamos una variable para el contenido de cada LI y
    //cambiamos el valor de las cartas para mostrar A, J, Q y K
    if (plCards[i] === 1) {
      li.appendChild(document.createTextNode('A'));
    } else if (plCards[i] === 10) {
      li.appendChild(document.createTextNode('J'));
    } else if (plCards[i] === 11) {
      li.appendChild(document.createTextNode('👸'));
    } else if (plCards[i] === 12) {
      li.appendChild(document.createTextNode('🤴'));
    } else {
      li.appendChild(document.createTextNode(+ plCards[i]));
    }
    //Anadimos los LI al UL
    document.querySelector('#player ul').appendChild(li);
  }
}

function erasePl() {
  while (document.querySelector('#player ul').firstChild) {
    document.querySelector('#player ul').removeChild(document.querySelector('#player ul').firstChild);
  }
}

function printDl() {
  //Print dealer cards in html
  //Con un for loop, iteramos por todos los elementos del array plCards
  for (var i = 0; i < dlCards.length; i++) {
    //Creamos un LI element
    var li = document.createElement('li');
    //Creamos una variable para el contenido de cada LI y
    //cambiamos el valor de las cartas para mostrar A, J, Q y K
    if (dlCards[i] === 1) {
      li.appendChild(document.createTextNode('A'));
    } else if (dlCards[i] === 10) {
      li.appendChild(document.createTextNode('J'));
    } else if (dlCards[i] === 11) {
      li.appendChild(document.createTextNode('👸'));
    } else if (dlCards[i] === 12) {
      li.appendChild(document.createTextNode('🤴'));
    } else {
      li.appendChild(document.createTextNode(dlCards[i]));
    }
    //Anadimos los LI al UL
    document.querySelector('#dealer ul').appendChild(li);
  }
}

function eraseDl() {
  while (document.querySelector('#dealer ul').firstChild) {
    document.querySelector('#dealer ul').removeChild(document.querySelector('#dealer ul').firstChild);
  }
}

let anotherCard = undefined;
// esta variable va a cambiar segun el PL quiera otra carta o no.
var hitButton = document.getElementById('hit');
hitButton.addEventListener('click', function next() {
  anotherCard = true;
  // cambiamos el valor de anotherCard para pedir otra carta y
  // ejecutamos plGame();
  plGame();
})
var standButton = document.getElementById('stand');
standButton.addEventListener('click', function next() {
  anotherCard = false;
  // cambiamos el valor de anotherCard para no pedir mas cartas y
  // ejecutamos dlGame() ya que el turno del PL se saltea;
  dlGame();
  // Deshabilitamos los botones de hit y stand ya que el juego del PL terminó
  document.getElementById("stand").disabled = true;
  document.getElementById("hit").disabled = true;
})

function plGame() {
  // Si se activa esta funcion es porque pedimos sacar una carta nueva
  if (anotherCard) {
    let nextPl = Math.floor(Math.random() * 12) + 1;
    // la generamos
    console.log(nextPl);
    // la imprimimos en consola
    plCards.push(nextPl);
    // la sumamos a la mano del PL
    erasePl();
    printPl();
    // la imprimimos en html
    console.log(plCards)
    console.log(plScore())
    // imprimimos la mano y el puntaje en consola
    anotherCard = undefined;
    // y seteamos la variable anotherCard de nuevo a undefined para que
    // el PL pueda elegir nuevamente entre 'hit' y 'stand' de ser necesario
    if (plScore() > 21) {
      // Apagamos los botones de 'hit' y 'stand' y se termina la partida.
      console.log("You've lost.")
      document.querySelector("#centralMsj").textContent = "Busted! you've lost.";
      // Deshabilitamos los botones de hit y stand ya que el juego del PL terminó
      document.getElementById("stand").disabled = true;
      document.getElementById("hit").disabled = true;
    } else if (plScore() === 21) {
      console.log('You made it to 21! lets see...')
      document.querySelector("#centralMsj").textContent = 'You made it to 21! lets see...';
      // Deshabilitamos los botones de hit y stand ya que el juego del PL terminó
      document.getElementById("stand").disabled = true;
      document.getElementById("hit").disabled = true;
      // Ejecutamos el juego del DL.
      setTimeout(dlGame, 2000);
    }
  }
}

function dlGame() {
  // Una vez que se ejecuta esta funcion habria que "apagar" los botones
  // de pedir carta y de plantarse porque el usuario ya no puede interactuar.
  // Lo hice antes de llamar la funcion;
  let nextDl = Math.floor(Math.random() * 12) + 1;
  console.log(nextDl);
  dlCards.push(nextDl);
  eraseDl();
  printDl();

  if (dlScore() === 21 && dlCards.length === 2) {
    console.log('The house scores a blackjack and wins!');
    document.querySelector("#centralMsj").textContent = 'The house scores a blackjack and wins!';
    // Si DL hace blackjack gana;
  } else if (plScore() === 21 && plCards.length === 2) {
    console.log('The players blackjack takes the game!')
    document.querySelector("#centralMsj").textContent = 'Your blackjack takes the game!';
    // Si PL hace blackjack y DL no, se termina la jugada de DL con
    // su segunda carta y no es necesario que siga jugando
  } else if (dlScore() > 21) {
    console.log('The house loses!');
    document.querySelector("#centralMsj").textContent = 'The house got busted! you win!';
  } else if (dlScore() <= 21 && dlScore() >= plScore()) {
    console.log(dlScore())
    console.log('The house wins!');
    document.querySelector("#centralMsj").textContent = 'The house wins!';
  } else if (dlScore() < 21 && dlScore() < plScore()) {
    console.log(dlScore())
    setTimeout(dlGame, 700);
    // Aguanten las funciones recursivas chabonnnnn
  }
  console.log(dlCards);
  console.log(dlScore());
}

function startGame() {
  dlCards = [];
  plCards = [];
  // Seteamos las manos de los jugares a arrays vacios para empezar
  dlFirstCard();
  eraseDl();
  printDl();
  console.log(dlCards);
  console.log(dlScore());
  // Ejecutamos la funcion que determina la primer carta del DL e imprimimos
  // cual es y que puntaje consigue.
  plHand();
  erasePl();
  printPl();
  // Imprimimos las cartas en HTML
  console.log(plCards);
  console.log(plScore());
  // Ejecutamos la funcion que determina las dos primeras cartas del PL e
  // imprimimos cuales son y que puntaje consigue.
  if (plScore() === 21) {
    document.querySelector("#centralMsj").textContent = 'Blackjack!';
    // Si de entrada PL saca un Blackjack lo imprimimos en pantalla e
    // inmediatamente ejecutamos la jugada del DL para ver si saca
    // un blackjack tambien.
    // Delay de 1 seg para que se imprima el Blackjack y dsp se borre;
    setTimeout(dlGame, 3000);
  }
}

var playButton = document.getElementById('play');
playButton.addEventListener('click', function next() {
  startGame();
  // Habilitamos los botones de hit y stand una vez la partida empieza
  document.getElementById("stand").disabled = false;
  document.getElementById("hit").disabled = false;
  document.getElementById("play").innerHTML = "Start again";
  document.querySelector("#centralMsj").textContent = '';
})
