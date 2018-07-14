function blackjack() {
  let dlCards = [];
  let plCards = [];
  let dlScore = function() {
    let score = 0;
    for(let i = 0; i < dlCards.length; i++) {
      if (dlCards[i] === 10 || dlCards[i] === 11 || dlCards[i] === 12) {
        score += 10;
      } else if (dlCards[i] === 1) {
        score += 11;
      } else {
        score += dlCards[i];
      }
    }
    for(let i = 0; i < dlCards.length; i++) {
      if (score > 21 && dlCards[i] === 1) {
        console.log('fix As');
        score -= 10;
        // for loop para solucionar el valor del As y que cambie de 11 a 1
        // segun la ocacion
      }
    }
    return score;
  };
  let plScore = function() {
    let score = 0;
    for(let i = 0; i < plCards.length; i++) {
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
        console.log("fix As");
        score -= 10;
      }
    }
    return score;
  };

  // Hasta aca definimos las variables que van a contener las cartas de cada
  // jugador y los puntajes de cada uno (que dependen de las cartas)

  function dlFirstCard() {
    let firstDl = Math.floor(Math.random() * 12) + 1;
    dlCards.push(firstDl);
    return firstDl;
  }

  console.log(dlFirstCard());
  console.log(dlScore());

  // Generamos y mostramos la primer carta de DL;

  function plHand() {
    let firstPl = Math.floor(Math.random() * 12) + 1;
    let secondPl = Math.floor(Math.random() * 12) + 1;
    plCards.push(firstPl);
    plCards.push(secondPl);
    return plCards;
  }

  console.log(plHand());
  console.log(plScore());

  // Generamos y mostramos las dos primeras cartas de PL;

  function plGame() {
    if (plScore() === 21) {
      console.log('Blackjack!')
    } else {
      function plNextCard() {
        if (plScore() > 21) {
          console.log("You've lost.")
        } else if (plScore() === 21) {
          console.log('You made it to 21! lets see...')
        } else {
          let next = window.confirm('Would you like another card?')
          if (next) {
            let nextPl = Math.floor(Math.random() * 12) + 1;
            console.log(nextPl);
            plCards.push(nextPl);
            console.log(plScore())
            plNextCard();
          }
        }
        return plCards;
      }
      console.log(plNextCard())
    }
    return plCards;
  }

  console.log(plGame());
  console.log(plScore());

  // Buenooooo, parece que me salio la recursive function!
  // Con esto terminariamos la mano del PL y empezariamos la del DL.

  function dlGame() {
    if (plScore() > 21) {
      console.log('The house wins.');
    } else {
      let nextDl = Math.floor(Math.random() * 12) + 1;
      console.log(nextDl);
      dlCards.push(nextDl);
      if (dlScore() === 21 && dlCards.length === 2) {
        console.log('The house scores a blackjack and wins!');
        // Si DL hace blackjack gana;
      } else if (plScore() === 21 && plCards.length === 2) {
        console.log('The players blackjack takes the game!')
        // Si PL hace blackjack y DL no, se termina la jugada de DL con
        // su segunda carta y no es necesario que siga jugando
      } else if (dlScore() > 21) {
        console.log('The house loses!');
      } else if (dlScore() <= 21 && dlScore() >= plScore()) {
        console.log(dlScore())
        console.log('The house wins!');
      } else if (dlScore() < 21 && dlScore() < plScore()) {
        console.log(dlScore())
        dlGame();
      }
    }
    return dlCards;
  }

  console.log(dlGame());
  console.log(dlScore());

  // Parece que el dlGame esta funcionando!
  // Aguanten las funciones recursivas chabonnnnn
}
