console.log("coucou");


let clickable = true;

let currentPairs = 0;
let maxPairs = 5;
let trycount = 0;

let cardSelected = 0;
let $firstCard;
let firstCardVal;
let $secondCard;
let secondCardVal; 

// timer
let timer;
let tens = 0;
let seconds = 0;
let timerstarted = false;
const $timerwrapper = document.getElementById('timer-wrapper');
const $timersec = document.getElementById('seconds');
const $timertens = document.getElementById('tens');

function updateTimer(){
    console.log('update timer');

    tens++;

    if( tens <= 9){
        $timertens.textContent = "0"+tens;
    } 
    if(tens > 9){
        $timertens.textContent = tens;
    }
    if(tens > 99){
        tens = 0;
        $timertens.textContent = "00";
        seconds++;
        $timersec.textContent = "0" + seconds;
    }
    if(seconds > 9){
        $timersec.textContent = seconds;
    }

}
function cardShuffle($cardswrapper, $cards){
    console.log("mélange des cartes");
    //
    for (var i = $cards.length; i >= 0;i--) {
     $cardswrapper.appendChild($cards[Math.random() * i | 0]);
    }
}
function checkresult($cardsLeft,$cardsRight,$wincounter,$winpopup,$overlay){
    
    console.log ("checking result");
    console.log($firstCard);
    console.log($secondCard);
    trycount++;
    $wincounter.textContent = trycount; 
    console.log("nombre d'essais",trycount);
    const $finalTime = document.getElementById('final-time');
//
    setTimeout(()=>{
        console.log("attent 800ms");

        if(firstCardVal == secondCardVal){
            console.log("bien joué!");

            currentPairs = currentPairs + 1;
            if(currentPairs == maxPairs){

                console.log("manche gagné");
                $winpopup.classList.remove('hidden');
                $overlay.classList.remove('hidden');
                clearInterval(timer);
                $finalTime.textContent = `${$timersec.textContent}:${$timertens.textContent}`;
            }
            
        }else {
            console.log("dommage");

            $firstCard.classList.remove('returned');
            $secondCard.classList.remove('returned');
        }
        // revenir à l'étt d'origine
        $cardsLeft.textContent= "_";
        $cardsRight.textContent= "_";
        cardSelected = 0;
        $firstCard = "";
        firstCardVal = "";
        $secondCard = "";
        secondCardVal = "";

        clickable = true;
    },800);
}



document.addEventListener("DOMContentLoaded", function(){
    console.log("ready");

    const $cardswrapper = document.querySelector('main');
    console.log($cardswrapper);
    const $cards = document.querySelectorAll('.card')
    console.log($cards);
    const $cardsLeft = document.getElementById('card-left');
    const $cardsRight = document.getElementById('card-right');
    console.log($cardsRight);
    const $winpopup = document.getElementById('winpopup');
    console.log($winpopup);
    const $overlay = document.getElementById('overlay');
    const $wincounter = document.getElementById('wincounter');
    console.log($wincounter);

    //
    //
    cardShuffle($cardswrapper, $cards);
    //

    $cards.forEach(function($card){
        $card.addEventListener("click", function(){
            console.log("click sur une carte");
            if(cardSelected == 0){
                $card.classList.add('returned');

                cardSelected = 1;
                $firstCard = $card;
                firstCardVal = $card.dataset.name;

                $cardsLeft.textContent = firstCardVal;

                if(timerstarted == false){
                    timerstarted = true;
                    timer = setInterval(() => {
                        updateTimer();
                    }, 10);
                }

            } else if (cardSelected == 1 && clickable == true) {
                $card.classList.add('returned');

                cardSelected = 2;
                $secondCard = $card;
                secondCardVal = $card.dataset.name;

                $cardsRight.textContent = secondCardVal;
                clickable = false;
                checkresult($cardsLeft,$cardsRight,$wincounter,$winpopup,$overlay);
            }else{
                console.log('nope');

            }
    
        });
        // redemarrer le jeu
        
    });
    const $reset = document.getElementById('reload');
    $reset.addEventListener('click', function(){
        console.log("click relancer");
        //
        clickable = false;
        //reset des cartes 
        $cards.forEach(function($card){
            $card.classList.remove('returned')
        })
        //valeur des cartes
        currentPairs = 0;
        cardSelected = 0;
        $firstCard = "";
        firstCardVal = "";
        $secondCard = "";
        secondCardVal = "";
        $winpopup.classList.add('hidden');
        $overlay.classList.add('hidden');
        trycount = 0;
        $wincounter.textContent = "0";
        
            setTimeout(()=>{
                cardShuffle($cardswrapper, $cards);
                clickable = true;

            }, 300);
            
            clearInterval(timer);
            timerstarted = false;
            $timersec.textContent = "00";
            $timertens.textContent = "00";
            tens = 0;
            seconds = 0;
    });

});  

