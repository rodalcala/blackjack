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
    //Print dealer score in html
    document.getElementById('dealerScore').textContent = score;
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
    //Print player score in html
    document.getElementById('playerScore').textContent = score ;
    return score;
  };

  // Hasta aca definimos las variables que van a contener las cartas de cada
  // jugador y los puntajes de cada uno (que dependen de las cartas)
  // Por ahora el as (1) = 11;

  function dlFirstCard() {
    let firstDl = Math.floor(Math.random() * 12) + 1;
    dlCards.push(firstDl);


  //Print dealer first card in html
  //Creamos un LI element
  var li = document.createElement('LI');
  //Creamos una variable para su contenido
  var dealerFirst = document.createTextNode(firstDl);
  //Anadimos el contenido al LI
  li.appendChild(dealerFirst);
  //Creamos una variable para apuntar al UL donde vamos a instertar el LI
  var ul = document.querySelector('#dealer ul');
  //Anadimos el LI al UL
  ul.appendChild(li);
  //

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
      //Print dealer first card in html
      //Con un for loop, iteramos por todos los elementos del array plCards
    for (var i = 0; i < plCards.length; i++) {
        //Creamos un LI element
        var li = document.createElement('li');
        //Creamos una variable para el contenido de cada LI
        li.appendChild(document.createTextNode(plCards[i]));
        //Anadimos los LI al UL
        document.querySelector('#player ul').appendChild(li);
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

      //Print dealer next card in html
      //Creamos un LI element
      var li = document.createElement('LI');
      //Creamos una variable para su contenido
      var dealerNext = document.createTextNode(nextDl);
      //Anadimos el contenido al LI
      li.appendChild(dealerNext);
      //Creamos una variable para apuntar al UL donde vamos a instertar el LI
      var ul = document.querySelector('#dealer ul');
      //Anadimos el LI al UL
      ul.appendChild(li);
      //

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

blackjack();

var playButton = document.getElementById('playAgain');
playButton.addEventListener('click', function next() {
  blackjack();
  }
)

// Agregue un boton para volver a jugar pero tiene un error porque en vez de mostrar solamente las nuevas
// cartas de los players, muestra las viejas mas las nuevas. O sea que despues de un par de juegos tenes
// una lista enorme de cartas que no tiene sentido.
