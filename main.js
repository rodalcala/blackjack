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
  //Print player firsts cards in html
  //Con un for loop, iteramos por todos los elementos del array plCards
  for (var i = 0; i < plCards.length; i++) {
    //Creamos un LI element
    var li = document.createElement('li');
    //Creamos una variable para el contenido de cada LI
    li.appendChild(document.createTextNode(plCards[i]));
    //Anadimos los LI al UL
    document.querySelector('#player ul').appendChild(li);
  }
}

function erasePl() {
  while(document.querySelector('#player ul').firstChild){
    document.querySelector('#player ul').removeChild(document.querySelector('#player ul').firstChild);
  }
}

function printDl() {
  //Print dealer firsts cards in html
  //Con un for loop, iteramos por todos los elementos del array plCards
  for (var i = 0; i < dlCards.length; i++) {
    //Creamos un LI element
    var li = document.createElement('li');
    //Creamos una variable para el contenido de cada LI
    li.appendChild(document.createTextNode(dlCards[i]));
    //Anadimos los LI al UL
    document.querySelector('#dealer ul').appendChild(li);
  }
}

function eraseDl() {
  while(document.querySelector('#dealer ul').firstChild){
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
})

function plGame() {
  // Si se activa esta funcion es porque pedimos sacar una carta nueva
  if (anotherCard) {
    let nextPl = Math.floor(Math.random() * 12) + 1;
    // la generamos
    console.log(nextPl);
    // la imprimimos
    plCards.push(nextPl);
    // la sumamos a la mano del PL
    erasePl();
    printPl();
    // la imprimimos en html
    console.log(plCards)
    console.log(plScore())
    // imprimimos la mano y el puntaje
    anotherCard = undefined;
    // y seteamos la variable anotherCard de nuevo a undefined para que
    // el PL pueda elegir nuevamente entre 'hit' y 'stand' de ser necesario
    if (plScore() > 21) {
      // Apagamos los botones de 'hit' y 'stand' y se termina la partida.
      console.log("You've lost.")
      document.querySelector("#centralMsj").textContent = "You've lost";
    } else if (plScore() === 21) {
      console.log('You made it to 21! lets see...')
      document.querySelector("#centralMsj").textContent = 'You made it to 21! lets see...';
      // Ejecutamos el juego del DL.
      dlGame();
    }
  }
}

function dlGame() {
  // Una vez que se ejecuta esta funcion habria que "apagar" los botones
  // de pedir carta y de plantarse porque el usuario ya no puede interactuar.
  if (plScore() > 21) {
    console.log('The house wins.');
  } else {
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
      document.querySelector("#centralMsj").textContent = 'The players blackjack takes the game!';
      // Si PL hace blackjack y DL no, se termina la jugada de DL con
      // su segunda carta y no es necesario que siga jugando
    } else if (dlScore() > 21) {
      console.log('The house loses!');
      document.querySelector("#centralMsj").textContent = 'The house loses!';
    } else if (dlScore() <= 21 && dlScore() >= plScore()) {
      console.log(dlScore())
      console.log('The house wins!');
      document.querySelector("#centralMsj").textContent = 'The house wins!';
    } else if (dlScore() < 21 && dlScore() < plScore()) {
      console.log(dlScore())
      dlGame();
      // Aguanten las funciones recursivas chabonnnnn
    }
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
    console.log('Blackjack!');
    // Si de entrada PL saca un Blackjack lo imprimimos en pantalla e
    // inmediatamente ejecutamos la jugada del DL para ver si saca
    // un blackjack tambien.
    dlGame();
  }
}

var playButton = document.getElementById('playAgain');
playButton.addEventListener('click', function next() {
  startGame();
})
