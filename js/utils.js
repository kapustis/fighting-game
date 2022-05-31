function rectangularCollision({rectangle1, rectangle2}) {

    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x
        && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function determineWinner({player, enemy, timerID}) {

    clearTimeout(timerID);

    document.querySelector('#displayText').style.display = 'flex';

    if (player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Tie';
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins';
    } else if (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins';
    }
}
let timer = 60;
let timerID = null;

function decreaseTimer() {
    timerID = setTimeout(decreaseTimer, 1000);

    if (timer > 0) {
        timer--;
        document.querySelector('#timer').innerHTML = String(timer);
    }

    if (timer === 0) {
        determineWinner({player, enemy, timerID});
    }
}

/*
function addEvent(el, event, callback, isCapture = false) {
    if (!el || !event || !callback || typeof callback !== 'function') return

    if (typeof el === 'string') {
        el = document.querySelector(el);
    }
    el.addEventListener(event, callback, isCapture)
}

addEvent(document, 'DOMContentLoaded', () => {

    addEvent('#displayText', 'click', function(e) {
        console.log('Tie');
    }, true)


});
*/
