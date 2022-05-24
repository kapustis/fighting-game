class Sprite {
    constructor(
        {
            position,
            imageSrc,
            scale = 1,
            framesMaxW = 1,
            framesMaxH = 1,
            offset = {x: 0, y: 0},
        }) {
        this.position = position;
        this.width = 50;
        this.height = 150;

        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMaxW = framesMaxW;
        this.framesMaxH = framesMaxH;

        this.framesCurrent = 0;

        this.frameElapsed = 0;
        this.frameHold = 10;
        this.offset = offset
    }

    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMaxW),
            0,
            this.image.width / this.framesMaxW,
            this.image.height / this.framesMaxH,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMaxW) * this.scale,
            (this.image.height / this.framesMaxH) * this.scale
        )
    }

    animateFrames() {
        this.frameElapsed++;

        if (this.frameElapsed % this.frameHold === 0) {
            if (this.framesCurrent < this.framesMaxW - 1) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0
            }
        }
    }

    update() {
        this.draw();
        this.animateFrames();
    }
}

class Fighter extends Sprite {
    constructor({
                    position,
                    velocity,
                    bgrColor = '#00ff04',
                    imageSrc,
                    scale = 1,
                    framesMaxW,
                    offset = {x: 0, y: 0}
                }) {
        super({
            position,
            imageSrc,
            scale,
            framesMaxW,
            offset
        })

        // this.position = position;
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

        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
    }

    // draw() {
        // c.fillStyle = this.bgrColor;
        // c.fillRect(this.position.x, this.position.y, this.width, this.height);

        // attack box
        // if (this.isAttacking) {
        //     c.fillStyle = '#ed0606'
        //     c.fillRect(
        //         this.attackBox.position.x,
        //         this.attackBox.position.y,
        //         this.attackBox.width,
        //         this.attackBox.height
        //     )
        // }
    // }

    update() {
        this.draw();
        this.animateFrames();

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) { //|| this.position.y <= 0
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
