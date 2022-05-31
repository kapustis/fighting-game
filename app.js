const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

/**
 * something like gravity
 * @type {number}
 */
const gravity = 0.7;


const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: "./img/background.png"
});


const shop = new Sprite({
    position: {
        x: 675,
        y: 256
    },
    imageSrc: "./img/shop.png",
    scale: 1.75,
    framesMaxW: 6,

});

const player = new Fighter({
    position: {
        x: 0,
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
    sprites: {
        idle: {
            imageSrc: './img/samuraiMack/Idle.png',
            framesMaxW: 8,
        },
        run: {
            imageSrc: './img/samuraiMack/Run.png',
            framesMaxW: 8,
        },
        jump: {
            imageSrc: './img/samuraiMack/Jump.png',
            framesMaxW: 2,
        },
        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            framesMaxW: 2
        },
        attack1: {
            imageSrc: './img/samuraiMack/Attack1.png',
            framesMaxW: 6
        },
        takeHit: {
            imageSrc: './img/samuraiMack/Take_Hit_White_Silhouette.png',
            framesMaxW: 4
        },
        death: {
            imageSrc: './img/samuraiMack/Death.png',
            framesMaxW: 6
        }
    },
    attackBox: {
        offset: {
            x: 75,
            y: 50
        },
        width: 155,
        height: 50
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
        x: 215,
        y: 171
    },
    sprites: {
        idle: {
            imageSrc: './img/kenji/Idle.png',
            framesMaxW: 4,
        },
        run: {
            imageSrc: './img/kenji/Run.png',
            framesMaxW: 8,
        },
        jump: {
            imageSrc: './img/kenji/Jump.png',
            framesMaxW: 2,
        },
        fall: {
            imageSrc: './img/kenji/Fall.png',
            framesMaxW: 2
        },
        attack1: {
            imageSrc: './img/kenji/Attack1.png',
            framesMaxW: 4
        },
        takeHit: {
            imageSrc: './img/kenji/TakeHit.png',
            framesMaxW: 3
        },
        death: {
            imageSrc: './img/kenji/Death.png',
            framesMaxW: 7
        }
    },
    flip: true,
    attackBox: {
        offset: {
            x: -155,
            y: 50
        },
        width: 155,
        height: 50
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
    ArrowUp: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

decreaseTimer();

function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    background.update();
    shop.update();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';

    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    //player movement
    if (keys.a.pressed && player.lastKey === 'a' && player.position.x !== 0) {
        player.velocity.x = -5;
        player.switchSprite('run');
    } else if (keys.d.pressed && player.lastKey === 'd' && player.position.x + 50 + player.velocity.x <= canvas.width) {
        player.velocity.x = 5;
        player.switchSprite('run');
    } else {
        player.switchSprite('idle');
    }

    // player jumping
    if (player.velocity.y < 0) {
        player.switchSprite('jump');
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall');
    }

    //enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft' && enemy.position.x !== 0) {
        enemy.switchSprite('run')
        enemy.velocity.x = -5;
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight' && enemy.position.x + 50 + enemy.velocity.x <= canvas.width) {
        enemy.velocity.x = 5;
        enemy.switchSprite('run');
    } else {
        enemy.switchSprite('idle');
    }

    // enemy jumping
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump');
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall');
    }

    // detect for collision , enemy gets hit
    if (
        rectangularCollision({rectangle1: player, rectangle2: enemy})
        && player.isAttacking
        && player.framesCurrent === 4
    ) {
        enemy.takeHit();
        player.isAttacking = false;

        // document.querySelector('#enemyHealth').style.width = enemy.health + '%';
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })
    }

    // player misses
    if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false;
    }
    // detect for collision , player gets hit
    if (rectangularCollision({rectangle1: enemy, rectangle2: player})
        && enemy.isAttacking
        && enemy.framesCurrent === 2
    ) {
        player.takeHit();
        enemy.isAttacking = false;

        // document.querySelector('#playerHealth').style.width = player.health + '%';
        gsap.to('#playerHealth', {
            width: player.health + '%'
        })
    }

    // if enemy misses
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false;
    }

    if (player.health <= 0 || enemy.health <= 0) {
        determineWinner({player, enemy, timerID});
    }
}

animate();
