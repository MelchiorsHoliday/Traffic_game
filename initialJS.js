console.log("this is the test");

// Constants
const character = document.querySelector('.character');
const room = document.querySelector('.room');
const missionEnd = document.querySelector('.mission_end');
let startTime = Date.now();
let lastDashTime = 0; // Track the time of the last dash
const dashCooldown = 3000; // Cooldown period for the dash in milliseconds
let step = 2; // Adjust as needed for smoother movement
console.log(startTime);

// Movement variables
let dx = 0;
let dy = 0;

// Movement function
function moveCharacter() {
    const characterRect = character.getBoundingClientRect();
    const roomRect = room.getBoundingClientRect();

    // Update character's position
    if (dx !== 0 || dy !== 0) {
        const newX = Math.min(Math.max(characterRect.left + dx, roomRect.left), roomRect.right - characterRect.width);
        const newY = Math.min(Math.max(characterRect.top + dy, roomRect.top), roomRect.bottom - characterRect.height);
        character.style.left = newX + 'px';
        character.style.top = newY + 'px';
    }

    // RAF
    requestAnimationFrame(moveCharacter);
}

// Start movement
moveCharacter();

// Handle keydown event
document.addEventListener('keydown', function(event) {
    const key = event.key;

    switch (key) {
        case 'ArrowLeft':
            dx = -step;
            break;
        case 'ArrowUp': 
            dy = -step;
            break;
        case 'ArrowRight':
            dx = step;
            break;
        case 'ArrowDown':
            dy = step;
            break;
    }
});

// Handle keyup event
document.addEventListener('keyup', function(event) {
    const key = event.key;
    
    switch (key) {
        case 'ArrowLeft':
            if (dx === -step) dx = 0;
            break;
        case 'ArrowUp': 
            if (dy === -step) dy = 0;
            break;
        case 'ArrowRight':
            if (dx === step) dx = 0;
            break;
        case 'ArrowDown':
            if (dy === step) dy = 0;
            break;
        case ' ': // Spacebar for dash
            const currentTime = Date.now();
            if (currentTime - lastDashTime > dashCooldown) { // Check if cooldown has passed
                dash();
                lastDashTime = currentTime; // Update last dash time
            }
            break;
    }
});

// Dash function
function dash() {
    if (step !== 2) {
        // If step is already increased (from a previous dash), do nothing
        return;
    }

    // Increase step to 10 for 1 second
    step = 10;

    // Reset step to 2 after 1 second
    setTimeout(() => {
        step = 2;
    }, 1000);
}


// function dash() {
//     // Get character's current position
//     const characterRect = character.getBoundingClientRect();
//     const roomRect = room.getBoundingClientRect();

//     // Calculate the direction of the dash
//     let dashX = 0;
//     let dashY = 0;
//     if (dx !== 0 || dy !== 0) {
//         // If character is moving, dash in the direction of movement
//         dashX = dx > 0 ? 50 : dx < 0 ? -50 : 0; // Dash horizontally
//         dashY = dy > 0 ? 50 : dy < 0 ? -50 : 0; // Dash vertically
//     } else {
//         // If character is not moving, dash towards the bottom of the container
//         dashY = 50;
//     }

//     // Calculate new position after dash
//     const newLeft = Math.min(Math.max(characterRect.left + dashX, roomRect.left), roomRect.right - characterRect.width);
//     const newTop = Math.min(Math.max(characterRect.top + dashY, roomRect.top), roomRect.bottom - characterRect.height);

//     // Apply new position
//     character.style.left = newLeft + 'px';
//     character.style.top = newTop + 'px';
// }

// Reaching the Train
function checkMissionEnd() {
    const characterRect = character.getBoundingClientRect();
    const missionEndRect = missionEnd.getBoundingClientRect();

    if (characterRect.right >= missionEndRect.left && characterRect.left <= missionEndRect.right && characterRect.bottom >= missionEndRect.top && characterRect.top <= missionEndRect.bottom) {
        // Timer
        const elapsedTime = Date.now() - startTime; // Calculate elapsed time
        alert("You caught the train! Time elapsed: " + (elapsedTime / 1000).toFixed(2) + " seconds");    
    }
    
    requestAnimationFrame(checkMissionEnd);
}

// Start checking for mission end
checkMissionEnd();
