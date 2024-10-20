const startPrankButton = document.getElementById('startPrank') as HTMLButtonElement;
const hiddenButton = document.getElementById('hiddenButton') as HTMLElement;
const messages = [
    "ohh hi there good news that ur trapped",
    "You can't escape from  here!",
    "ohh u wanna escape",
    "try!",
    "cant?? sorry i mad you angry and surprised find abutton and escape"
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
    document.getElementById('stopPrank')!.addEventListener('click', () => {
        clearInterval(interval);
        document.body.style.backgroundColor = ''; // Reset background
        hiddenButton.style.display = 'none'; // Hide stop button
        window.onbeforeunload = null; // Re-enable refreshing and closing
        alert("u found it now goo!");
    });

    // Show messages in a loop
    setInterval(showMessage, 2000); // Show message every 2 seconds
}

// Add event listener to start button
startPrankButton.addEventListener('click', startPrank);
