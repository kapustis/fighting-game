const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)


class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width= 50
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if(this.position.y + this.height + this.velocity.y >= canvas.height || this.position.y === 0){
            this.velocity.y = -this.velocity.y
        }

        if(this.position.x + this.width + this.velocity.x >= canvas.width || this.position.x === 0){
            this.velocity.x = -this.velocity.x
        }
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 1,
        y: 1
    }
})



const enemy = new Sprite({
    position: {
        x: 200,
        y: 100
    },
    velocity: {
        x: 2,
        y: 10
    }
})



function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update()
    enemy.update()
}

animate()
