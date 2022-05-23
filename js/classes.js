class Sprite {
    constructor({position,imageSrc}) {
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.image = new Image();
        this.image.src = imageSrc
    }

    draw() {
        c.drawImage(this.image,this.position.x,this.position.x)
    }

    update() {
        this.draw();
    }


}

class Fighter {
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
