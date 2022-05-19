const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

/**
 * something like gravity
 * @type {number}
 */
const gravity = 0.2;

class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
    }

    draw() {
        c.fillStyle = 'red'

        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if (this.position.y + this.height + this.velocity.y >= canvas.height) { //|| this.position.y <= 0
            // this.velocity.y = -this.velocity.y
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }

        if (this.position.x + this.width + this.velocity.x >= canvas.width || this.position.x === 0) {
            this.velocity.x = -this.velocity.x
            // this.velocity.x = 0
        } else {
            // this.velocity.x += gravity

        }
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})


const enemy = new Sprite({
    position: {
        x: 200,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    }
})
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
}

let lastKey

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0

    if (keys.a.pressed && lastKey === 'a') {
        player.velocity.x = -1
    } else if (keys.d.pressed && lastKey === 'd') {
        player.velocity.x = 1
    }
}

animate()

window.addEventListener('keydown', (event) => {

    switch (event.code) {
        case 'KeyD':
            keys.d.pressed = true;
            lastKey = 'd'
            break
        case  'KeyA':
            keys.a.pressed = true;
            lastKey = 'a'
            break
    }
})

window.addEventListener('keyup', (event) => {

    switch (event.code) {
        case 'KeyD':
            keys.d.pressed = false
            break
        case  'KeyA':
            keys.a.pressed = false
            break
    }
})
