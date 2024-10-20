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
 *   ║   Credits: Made by LEGACY Ar!O and dramatic kai                      ║  
 *   ╚═════════════════════════════════════════════════════════════════════╝  
 */

const startPrankButton = document.getElementById('startPrank');
const stopPrankButton = document.getElementById('stopPrank');
const messages = [
    "Oh hi there! Good news that you're trapped!",
    "You can't escape from here!",
    "Oh, you wanna escape?",
    "Try!",
    "Can't?? Sorry, I made you angry and surprised. Find the stop button to escape!"
];

let leaveAttempts = 0;

function showMessage() {
    const message = messages[Math.floor(Math.random() * messages.length)];
    alert(message);
}

function startPrank() {
    startPrankButton.style.display = 'none';

    // Make the stop button visible but in a random position
    stopPrankButton.style.position = 'fixed';
    stopPrankButton.style.top = Math.random() * (window.innerHeight - 50) + 'px';
    stopPrankButton.style.left = Math.random() * (window.innerWidth - 100) + 'px';
    stopPrankButton.style.display = 'block';
    stopPrankButton.style.zIndex = '9999';

    const colors = ['white', 'black', 'pink', 'blue'];
    let i = 0;

    const interval = setInterval(() => {
        document.body.style.backgroundColor = colors[i % colors.length];
        i++;
    }, 100);

    // Prevent closing the tab or browser
    window.onbeforeunload = (e) => {
        e.preventDefault();
        e.returnValue = '';
        return '';
    };

    // Handle leave attempts
    window.addEventListener('unload', handleLeaveAttempt);

    // Disable right-click
    document.oncontextmenu = () => false;

    // Disable some keyboard shortcuts
    document.onkeydown = (e) => {
        if (e.ctrlKey && (e.key === 'w' || e.key === 'W' || e.key === 'F4')) {
            e.preventDefault();
            return false;
        }
    };

    // Request fullscreen
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }

    stopPrankButton.addEventListener('click', () => {
        clearInterval(interval);
        document.body.style.backgroundColor = '';
        window.onbeforeunload = null;
        window.removeEventListener('unload', handleLeaveAttempt);
        document.oncontextmenu = null;
        document.onkeydown = null;
        alert("You found it! Now you can leave.");
        location.reload();
    });

    setInterval(showMessage, 2000);
}

function handleLeaveAttempt() {
    leaveAttempts++;
    if (leaveAttempts === 1) {
        // On first attempt, stay on the same page
        setTimeout(() => {
            window.location.reload();
        }, 50);
    } else if (leaveAttempts === 2) {
        // On second attempt, redirect to YouTube
        setTimeout(() => {
            window.location.href = "https://youtu.be/xvFZjo5PgG0?si=rPiQKQ8Ezms-th5W";
        }, 50);
    }
}

startPrankButton.addEventListener('click', startPrank);

// Check if this is a reload after a leave attempt
if (sessionStorage.getItem('leaveAttempt')) {
    leaveAttempts = parseInt(sessionStorage.getItem('leaveAttempt'));
    sessionStorage.setItem('leaveAttempt', leaveAttempts + 1);
    startPrank();
} else {
    sessionStorage.setItem('leaveAttempt', '0');
}
