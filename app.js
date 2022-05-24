const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

/**
 * something like gravity
 * @type {number}
 */
const gravity = 0.7;

let timer = 60;

let timerID = null;

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc:"./img/background.png",

});

const shop = new Sprite({
    position: {
        x: 675,
        y: 256
    },
    imageSrc:"./img/shop.png",
    scale: 1.75,
    frameMaxW: 6,

});

const player = new Fighter({
    position: {
        x: 0,
        y: 300
    },
    velocity: {
        x: 0,
        y: 0
    },
    bgrColor: '#00ff04',
    offset: {
        x: 0,
        y: 0
    }
});

const enemy = new Fighter({
    position: {
        x: 200,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    bgrColor: '#f5d812',
    offset: {
        x: -50,
        y: 0
    }
});

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
    } else {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins';
    }
}

function decreaseTimer() {
    timerID = setTimeout(decreaseTimer, 1000)
    if (timer > 0) {
        timer--;
        document.querySelector('#timer').innerHTML = String(timer);
    }
    if (timer === 0) {
        determineWinner({player, enemy, timerID});
    }
}

decreaseTimer();
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


function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);

    background.update();
    shop.update();
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    //player movement
    if (keys.a.pressed && player.lastKey === 'a' && player.position.x !== 0) {
        player.velocity.x = -10;
    } else if (keys.d.pressed && player.lastKey === 'd' && player.position.x + 50 + player.velocity.x <= canvas.width) {
        player.velocity.x = 10;
    }
    //enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft' && enemy.position.x !== 0) {
        enemy.velocity.x = -10;
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight' && enemy.position.x + 50 + enemy.velocity.x <= canvas.width) {
        enemy.velocity.x = 10;
    }
    // detect for collision
    if (rectangularCollision({rectangle1: player, rectangle2: enemy}) && player.isAttacking) {
        console.log('detect for collision');
        player.isAttacking = false;
        enemy.health -= 20
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }

    if (rectangularCollision({rectangle1: enemy, rectangle2: player}) && enemy.isAttacking) {
        console.log('enemy attack successful');
        enemy.isAttacking = false;
        player.health -= 20
        document.querySelector('#playerHealth').style.width = player.health + '%'
    }

    if (player.health <= 0 || enemy.health <= 0) {
        determineWinner({player, enemy, timerID});
    }
}

animate();
