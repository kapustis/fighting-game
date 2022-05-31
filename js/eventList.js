/**
 * EventList
 */

window.addEventListener('keydown', (event) => {

    if(event.code === 'KeyR'){
        location.reload();
    }

   if(!player.dead || !enemy.dead){
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
               if (player.position.y === 330) {
                   player.velocity.y = -20;
               }
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
               if (enemy.position.y === 330) {
                   enemy.velocity.y = -20;
               }
               break
           case  'ArrowDown':
               enemy.attack();
               break
       }
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
