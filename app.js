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
    framesMaxW: 6,

});

const player = new Fighter({
    position: {
        x: 50,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: './img/samuraiMack/Idle.png',
    framesMaxW: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 157
    },
    sprites:{
        idle:{
            imageSrc: './img/samuraiMack/Idle.png',
            framesMaxW: 8,
        },
        run:{
            imageSrc: './img/samuraiMack/Run.png',
            framesMaxW: 8,
        },
        jump:{
            imageSrc: './img/samuraiMack/Jump.png',
            framesMaxW: 2,
        },
        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            framesMaxW: 2
        }
    }
});

const enemy = new Fighter({
    position: {
        x: 680,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    // bgrColor: '#f5d812',
    imageSrc: './img/kenji/Idle.png',
    framesMaxW: 4,
    scale: 2.5,
    offset: {
        x: 0,
        y: 171
    }
});

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
    // enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    //player movement
    if (keys.a.pressed && player.lastKey === 'a' && player.position.x !== 0) {
        player.velocity.x = -10;
        player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd' && player.position.x + 50 + player.velocity.x <= canvas.width) {
        player.velocity.x = 10;
        player.switchSprite('run')
    }else {
        player.switchSprite('idle')
    }

    // player jumping
    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
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
