/**
 * EventList
 */

window.addEventListener('keydown', (event) => {
    // console.log(event.code)
    switch (event.code) {

        //player keys
        case 'KeyD':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break
        case  'KeyA':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break
        case  'KeyW':
            keys.w.pressed = true;
            player.lastKey = 'w';
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
            keys.ArrowUp.pressed = true;
            enemy.lastKey = 'ArrowUp';
            break
        case  'ArrowDown':
            enemy.attack();
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
        case  'KeyW':
            keys.w.pressed = false;
            break
        //enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break
        case  'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break
        case  'ArrowUp':
            keys.ArrowUp.pressed = false;

            break
    }
})
