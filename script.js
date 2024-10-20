/*
 *   █████╗ ██╗  ██╗██╗██╗██╗     ███████╗██╗ ██████╗ ██╗   ██╗██╗   ██╗  
 *   ██╔══██╗██║  ██║██║██║██║     ██╔════╝██║██╔═══██╗██║   ██║██║   ██║  
 *   ███████║███████║██║██║██║     █████╗  ██║██║   ██║██║   ██║██║   ██║  
 *   ██╔══██║██╔══██║██║██║██║     ██╔══╝  ██║██║   ██║██║   ██║██║   ██║  
 *   ██║  ██║██║  ██║██║██║███████╗██║     ██║╚██████╔╝╚██████╔╝╚██████╔╝  
 *   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝╚══════╝╚═╝     ╚═╝ ╚═════╝  ╚═════ ╝  ╚═════╝   
 *                                   kaisupreme                              
 *   ╔═════════════════════════════════════════════════════════════════════╗  
 *   ║   Powered by KA1 tamatarnet                                         ║  
 *   ║   System affiliated by PD MIRCHI V1                                  ║  
 *   ║   This code is crafted using its own code BETA powerful library.     ║  
 *   ║   Credits: Made by LEGACY Ar!O                                       ║  
 *   ╚═════════════════════════════════════════════════════════════════════╝  
 */

const startPrankButton = document.getElementById('startPrank');
const stopPrankButton = document.getElementById('stopPrank');
const messages = [
    "Oh hi there! Good news that you're trapped!",
    "You can't escape from here!",
    "Oh, you wanna escape?",
    "Try!",
    "Can't?? Sorry, I made you angry and surprised. Find a hidden button to escape!"
];

function showMessage() {
    const message = messages[Math.floor(Math.random() * messages.length)];
    alert(message);
}

// Function to start the prank
function startPrank() {
    // Disable refreshing and closing
    window.onbeforeunload = function() {
        return "Are you sure you want to leave?";
    };

    // Hide the start button
    startPrankButton.style.display = 'none';

    // Position the stop button in the top left corner and make it tiny
    stopPrankButton.style.position = 'fixed';
    stopPrankButton.style.top = '5px';
    stopPrankButton.style.left = '5px';
    stopPrankButton.style.width = '10px';
    stopPrankButton.style.height = '10px';
    stopPrankButton.style.fontSize = '1px';
    stopPrankButton.style.opacity = '0.1';
    stopPrankButton.style.display = 'block';

    // Start flashing colors
    const colors = ['white', 'black', 'pink', 'blue'];
    let i = 0;

    const interval = setInterval(() => {
        document.body.style.backgroundColor = colors[i % colors.length];
        i++;
    }, 100); // Change color every 100 ms

    // Disable right-click
    document.oncontextmenu = function() { return false; };

    // Disable keyboard shortcuts
    document.onkeydown = function(e) {
        if (e.ctrlKey || e.altKey || e.metaKey) {
            return false;
        }
        if ([116, 123].indexOf(e.keyCode) > -1) { // F5 and F12 keys
            return false;
        }
    };

    // Disable selection
    document.onselectstart = function() { return false; };

    // Make the page fullscreen
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }

    // Stop the prank when the stop button is clicked
    stopPrankButton.addEventListener('click', () => {
        clearInterval(interval);
        document.body.style.backgroundColor = ''; // Reset background
        window.onbeforeunload = null; // Re-enable refreshing and closing
        document.oncontextmenu = null; // Re-enable right-click
        document.onkeydown = null; // Re-enable keyboard shortcuts
        document.onselectstart = null; // Re-enable selection
        alert("You found it! Now you can leave.");
        location.reload(); // Reload the page to reset everything
    });

    // Show messages in a loop
    setInterval(showMessage, 2000); // Show message every 2 seconds
}

// Add event listener to start button
startPrankButton.addEventListener('click', startPrank);
