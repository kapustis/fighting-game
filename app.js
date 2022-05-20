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

class Sprite {
    constructor({position, velocity, bgrColor, offset}) {
        this.position = position
        this.velocity = velocity
        this.bgrColor = bgrColor
        this.height = 150
        this.width = 50
        this.lastKey = ''
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.isAttacking = false
    }

    draw() {
        c.fillStyle = this.bgrColor;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        // attack box
        if (this.isAttacking) {
            c.fillStyle = 'green'
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
    bgrColor: 'red',
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
    bgrColor: 'blue',
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
        player.isAttacking = false
    }

    if (rectangularCollision({rectangle1: enemy, rectangle2: player}) && enemy.isAttacking) {
        console.log('enemy attack successful');
        enemy.isAttacking = false
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
            enemy.isAttacking = true
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
