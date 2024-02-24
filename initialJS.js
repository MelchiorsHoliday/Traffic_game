console.log("this is the test");

// Constants
const character = document.querySelector('.character');
const room = document.querySelector('.room');
const missionEnd = document.querySelector('.mission_end');
let startTime = Date.now();
console.log(startTime);

// Movement
document.addEventListener('keydown', function(event) {
    const key = event.key;
    const characterRect = character.getBoundingClientRect();
    const missionEndRect = missionEnd.getBoundingClientRect();
    const roomRect = room.getBoundingClientRect();
    const step = 15;

    switch (key) {
        case 'ArrowLeft':
            if (characterRect.left - step >= roomRect.left) {
                character.style.left = (characterRect.left - step) + 'px';
            }
            break;
        case 'ArrowUp': 
            if (characterRect.top - step >= roomRect.top) {
                character.style.top = (characterRect.top - step) + 'px';
            }
            break;
        case 'ArrowRight':
            if (characterRect.right + step <= roomRect.right) {
                character.style.left = (characterRect.left + step) + 'px';
            }
            break;
        case 'ArrowDown':
            if (characterRect.bottom + step <= roomRect.bottom) {
                character.style.top = (characterRect.top + step) + 'px';
            }
            break;
    }

    // Reaching the Train
    if (characterRect.right >= missionEndRect.left && characterRect.left <= missionEndRect.right && characterRect.bottom >= missionEndRect.top && characterRect.top <= missionEndRect.bottom) {
        // Timer
        const elapsedTime = Date.now() - startTime; // Calculate elapsed time
        alert("You caught the train! Time elapsed: " + (elapsedTime/1000).toFixed + " seconds");    
    }
});


