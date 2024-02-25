// Constants
const character = document.querySelector('.character');
const room = document.querySelector('.room');
const missionEnd = document.querySelector('.mission_end');
let startTime = Date.now();
let lastDashTime = 0; // Track the time of the last dash
const dashCooldown = 1000; // Cooldown period for the dash in milliseconds
let step = 7; // Adjust as needed for smoother movement

// Movement variables
let dx = 0;
let dy = 0;

// Movement function
function moveCharacter() {
    const characterRect = character.getBoundingClientRect();
    const roomRect = room.getBoundingClientRect();

    // Reaching the Train

    let missionEndRect = missionEnd.getBoundingClientRect();
    if (characterRect.right >= missionEndRect.left && characterRect.left <= missionEndRect.right && characterRect.bottom >= missionEndRect.top && characterRect.top <= missionEndRect.bottom) {
    // Timer
    const elapsedTime = Date.now() - startTime; // Calculate elapsed time
    alert("You made it! It took you: " + (elapsedTime/1000).toFixed() + " seconds");    
        }
   
    // Update character's position
    const newX = Math.min(Math.max(characterRect.left + dx, roomRect.left), roomRect.right - characterRect.width);
    const newY = Math.min(Math.max(characterRect.top + dy, roomRect.top), roomRect.bottom - characterRect.height);
    
    // Check for collision with obstacles
    
    // Function to check collision with obstacles
    function checkCollision(x, y) {
    const obstacles = document.querySelectorAll('#pedestrian');
    const characterRect = { left: x, top: y, right: x + character.offsetWidth, bottom: y + character.offsetHeight };
    
    for (let obstacle of obstacles) {
        const obstacleRect = obstacle.getBoundingClientRect();
        if (characterRect.right > obstacleRect.left && characterRect.left < obstacleRect.right &&
            characterRect.bottom > obstacleRect.top && characterRect.top < obstacleRect.bottom) {
            return true; // Collision detected
        }
    }
    return false; // No collision detected
    
    }
    
if (checkCollision(newX, newY)) {
    // Reset character position
        character.style.left = '50%';
        character.style.top = '11%';
        startTime = Date.now(); // Reset the timer
        dx = 0; // Reset dx
        dy = 0; // Reset dy
        moveCharacter();
        return; // Stop further movement
    }
    character.style.left = newX + 'px';
    character.style.top = newY + 'px';
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
            dy = 0; // Reset dy when left arrow is pressed
            break;
        case 'ArrowUp': 
            dy = -step;
            dx = 0; // Reset dx when up arrow is pressed
            break;
        case 'ArrowRight':
            dx = step;
            dy = 0; // Reset dy when right arrow is pressed
            break;
        case 'ArrowDown':
            dy = step;
            dx = 0; // Reset dx when down arrow is pressed
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
    }
});

// Dash function
function dash() {
    // Get character's current position
    const characterRect = character.getBoundingClientRect();
    const roomRect = room.getBoundingClientRect();

    // Calculate the direction of the dash
    let dashX = 0;
    let dashY = 0;
    if (dx !== 0 || dy !== 0) {
        // If character is moving, dash in the direction of movement
        dashX = dx > 0 ? 50 : dx < 0 ? -50 : 0; // Dash horizontally
        dashY = dy > 0 ? 50 : dy < 0 ? -50 : 0; // Dash vertically
    } else {
        // If character is not moving, dash towards the bottom of the container
        dashY = 50;
    }

    // Calculate new position after dash
    const newLeft = Math.min(Math.max(characterRect.left + dashX, roomRect.left), roomRect.right - characterRect.width);
    const newTop = Math.min(Math.max(characterRect.top + dashY, roomRect.top), roomRect.bottom - characterRect.height);

    // Apply new position
    character.style.left = newLeft + 'px';
    character.style.top = newTop + 'px';
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

 let rand1 = getRandomInt(1,100);
 let rand2 = getRandomInt(1,100);
 let rand3 = getRandomInt(1,100);
 let rand4 = getRandomInt(1,100);
 let rand5 = getRandomInt(1,100);
 let rand6 = getRandomInt(1,100);
 let rand7 = getRandomInt(1,100);
 let rand8 = getRandomInt(1,100);
//-------------------
// const roomWidth = room.clientWidth; // or room.offsetWidth
// const roomHeight = room.clientHeight;

// function updateRandomValues() {
//     const randomTop1 = Math.random() * roomHeight;

    
    
//     document.documentElement.style.setProperty('--random-top1', `${randomTop1}px`);

// }

// // Call the function initially to set the initial random values
// updateRandomValues();

// // Add an event listener to update the random values before each animation iteration
// document.querySelector('.obstaclesL1').addEventListener('animationiteration', updateRandomValues);
// //-----------------------------