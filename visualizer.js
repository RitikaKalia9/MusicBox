// Remove this line from visualizer.js if it's already declared elsewhere
// const audioPlayer = new AudioPlayer('path/to/your/song.mp3');

// Use the existing audioPlayer instance instead
let theme = '';

// Function to fetch GIF from your custom API
async function fetchGif() {
    const response = await fetch(`http://127.0.0.1:5000/api/gifs?theme=${theme}`); // Update with your API endpoint
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.gifUrl; // Adjust based on your API response structure
}

// Event listener for the theme input button
document.getElementById('setThemeButton').addEventListener('click', () => {
    theme = document.getElementById('themeInput').value; // Get the theme from input field
    if (theme) {
        audioPlayer.play(); // Start playing the audio when a theme is set
    }
});

// Set the kick callback to fetch and display GIFs
audioPlayer.setKickCallback(async () => {
    if (theme) { // Only fetch GIF if a theme is entered
        try {
            const gifUrl = await fetchGif();
            document.getElementById('gifDisplay').src = gifUrl; // Update with your image element's ID
        } catch (error) {
            console.error('Error fetching GIF:', error);
        }
    }
});
