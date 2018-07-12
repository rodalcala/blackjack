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
    return score;
  };

  function firstCard() {
    let firstDl = Math.floor(Math.random() * 12) + 1;
    dlCards.push(firstDl);
    return firstDl;
  }

  console.log(firstCard());
  console.log(dlScore());

  function plHand() {
    let firstPl = Math.floor(Math.random() * 12) + 1;
    let secondPl = Math.floor(Math.random() * 12) + 1;
    plCards.push(firstPl);
    plCards.push(secondPl);
    return plCards;
  }

  console.log(plHand());
  console.log(plScore());

  function thirdCard() {
    let third = window.confirm('Would you like another card?')
    if (third) {
      let thirdPl = Math.floor(Math.random() * 12) + 1;
      plCards.push(thirdPl);
    }
    return plCards;
  }

  console.log(thirdCard());
  console.log(plScore());

  // Aca creo que quiero hacer una recursive function para que a partir
  // de la cuarta carta como que haga un loop preguntando si quiere otra
  // carta hasta que diga que no o el score >= 21;

  // if (plScore() > 21) {
  //   console.log("You've lost!")
  // } else if (plScore() === 21) {
  //   console.log("You've got 21!")
  // } else {
  //   while (plScore() < 21) {
  //
  //   }
  // }
}
