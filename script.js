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
const hiddenButton = document.getElementById('hiddenButton');
const messages = [
    "Oh hi there! Good news that you're trapped!",
    "You can't escape from here!",
    "Oh, you wanna escape?",
    "Try!",
    "Can't?? Sorry, I made you angry and surprised. Find a button to escape!"
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

    // Show the hidden button
    hiddenButton.style.display = 'block';

    // Start flashing colors
    const colors = ['white', 'black', 'pink', 'blue'];
    let i = 0;

    const interval = setInterval(() => {
        document.body.style.backgroundColor = colors[i % colors.length];
        i++;
    }, 100); // Change color every 100 ms

    // Stop the prank when the stop button is clicked
    document.getElementById('stopPrank').addEventListener('click', () => {
        clearInterval(interval);
        document.body.style.backgroundColor = ''; // Reset background
        hiddenButton.style.display = 'none'; // Hide stop button
        window.onbeforeunload = null; // Re-enable refreshing and closing
        alert("You found it! Now go!");
    });

    // Show messages in a loop
    setInterval(showMessage, 2000); // Show message every 2 seconds
}

// Add event listener to start button
startPrankButton.addEventListener('click', startPrank);
