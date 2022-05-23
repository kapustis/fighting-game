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

class Sprite {
    constructor({position, velocity, bgrColor, offset}) {
        this.position = position;
        this.velocity = velocity;
        this.bgrColor = bgrColor;
        this.height = 150;
        this.width = 50;
        this.lastKey = '';
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 10
        };
        this.isAttacking = false;
        this.health = 100;
    }

    draw() {
        c.fillStyle = this.bgrColor;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        // attack box
        if (this.isAttacking) {
            c.fillStyle = '#ed0606'
            c.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height
            )
        }
    }

    update() {
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if (this.position.y + this.height + this.velocity.y >= canvas.height) { //|| this.position.y <= 0
            // this.velocity.y = -this.velocity.y
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity

        }

        if (this.position.x + this.width + this.velocity.x >= canvas.width || this.position.x < 0) {
            // this.velocity.x = -this.velocity.x
            this.velocity.x = 0
        } else {
            // this.velocity.x += gravity
        }
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}

const player = new Sprite({
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

const enemy = new Sprite({
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

/**
 * key var
 * @type {{a: {pressed: boolean}, d: {pressed: boolean}}}
 */
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

/** key var **/

function rectangularCollision({rectangle1, rectangle2}) {

    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x
        && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function determineWinner({player, enemy,timerID}) {

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
    timerID =  setTimeout(decreaseTimer, 1000)
    if (timer > 0) {
        timer--;
        document.querySelector('#timer').innerHTML = String(timer);
    }
    if (timer === 0) {
        determineWinner({player, enemy,timerID});
    }
}

decreaseTimer();

// function addEvent(el, event, callback, isCapture = false) {
//     if (!el || !event || !callback || typeof callback !== 'function') return
//
//     if (typeof el === 'string') {
//         el = document.querySelector(el);
//     }
//     el.addEventListener(event, callback, isCapture)
// }
//
// addEvent(document, 'DOMContentLoaded', () => {
//
//     addEvent('#displayText', 'click', function(e) {
//         console.log('Tie');
//     }, true)
//
//
// })

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
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
        determineWinner({player, enemy,timerID});
    }
}

animate();
/**
 * EventList
 */
window.addEventListener('keydown', (event) => {
    console.log(event.code)
    switch (event.code) {
        case 'KeyD':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break
        case  'KeyA':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break
        case  'KeyW':
            player.velocity.y = -20;
            break
        case  'Space':
            player.attack()
            break
        //enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break
        case  'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break
        case  'ArrowUp':
            enemy.velocity.y = -20;
            break
        case  'ArrowDown':
            // enemy.isAttacking = true
            enemy.attack()
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyD':
            keys.d.pressed = false;
            break
        case  'KeyA':
            keys.a.pressed = false;
            break
        //enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break
        case  'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break
    }
})
