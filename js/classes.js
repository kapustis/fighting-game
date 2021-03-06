class Sprite {
    constructor(
        {
            position,
            imageSrc,
            scale = 1,
            framesMaxW = 1,
            framesMaxH = 1,
            offset = {x: 0, y: 0},
            flip = false
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
        this.framesElapsed = 0;
        this.framesHold = 10;
        this.offset = offset;
        this.flip = flip;
    }

    draw() {

        if (this.flip) {
            // ctx.scale(-1, 1);
        }

        ctx.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMaxW),
            0,
            this.image.width / this.framesMaxW,
            this.image.height / this.framesMaxH,
            // this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMaxW) * this.scale,
            (this.image.height / this.framesMaxH) * this.scale
            // this.image.height  * this.scale
        );

        // ctx.restore();
    }

    animateFrames() {
        this.framesElapsed++;

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMaxW - 1) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0;
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
                    framesMaxW = 1,
                    offset = {x: 0, y: 0},
                    sprites,
                    flip,
                    attackBox = {offset: {}, width: undefined, height: undefined}
                }) {
        super({
            position,
            imageSrc,
            scale,
            framesMaxW,
            offset,
            flip
        })

        this.velocity = velocity;
        this.bgrColor = bgrColor;
        this.width = 50;
        this.height = 150;
        this.lastKey = ''
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        };

        this.isAttacking = false;
        this.health = 100;

        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.sprites = sprites;
        this.dead = false;

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }

    update() {
        this.draw();
        if (!this.dead) {
            this.animateFrames();
        }

        // attack boxes
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        // ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        // gravity func
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            // this.velocity.y = -this.velocity.y
            this.velocity.y = 0;
            this.position.y = 330;
        } else {
            this.velocity.y += gravity
        }

    }

    attack() {
        this.switchSprite('attack1');
        this.isAttacking = true;

    }

    takeHit() {
        this.health -= 20;

        if (this.health <= 0) {
            this.switchSprite('death');
        } else {
            this.switchSprite('takeHit');
        }
    }

    switchSprite(sprite) {
        if (this.image === this.sprites.death.image) {
            if (this.framesCurrent === this.sprites.death.framesMaxW - 1)
                this.dead = true
            return
        }

        // overriding all other animations with the attack animation
        if (this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMaxW - 1) {

            return
        }

        // override when fighter gets hit
        if (
            this.image === this.sprites.takeHit.image &&
            this.framesCurrent < this.sprites.takeHit.framesMaxW - 1
        )
            return

        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMaxW = this.sprites.idle.framesMaxW
                    this.framesCurrent = 0
                }
                break
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.framesMaxW = this.sprites.run.framesMaxW
                    this.framesCurrent = 0
                }
                break
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.framesMaxW = this.sprites.jump.framesMaxW
                    this.framesCurrent = 0
                }
                break
            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.framesMaxW = this.sprites.fall.framesMaxW
                    this.framesCurrent = 0
                }
                break
            case 'attack1':
                if (this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image
                    this.framesMaxW = this.sprites.attack1.framesMaxW
                    this.framesCurrent = 0
                }
                break
            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image) {
                    console.log("hit")
                    this.image = this.sprites.takeHit.image;
                    this.framesMaxW = this.sprites.takeHit.framesMaxW
                    this.framesCurrent = 0
                }
                break
            case 'death':
                if (this.image !== this.sprites.death.image) {
                    console.log("hit")
                    this.image = this.sprites.death.image;
                    this.framesMaxW = this.sprites.death.framesMaxW
                    this.framesCurrent = 0
                }
                break
        }
    }

}
