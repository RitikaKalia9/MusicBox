// Global variables
let audioPlayer = null;
let isPlaying = false;
let gifUrls = []; // Store fetched GIF URLs globally

// Reference to play/pause button
const playPauseButton = document.getElementById('play-pause-button');

// Load songs from songs.json and populate the selector
async function loadSongs() {
    try {
        const response = await fetch('songs.json');
        const songs = await response.json();
        const songSelector = document.getElementById('song-selector');

        // Populate the <select> element with song options
        Object.entries(songs).forEach(([key, song]) => {
            const option = document.createElement('option');
            option.value = song.songUrl; // Set the song URL as value
            option.textContent = `${song.title} - ${song.artist}`;
            songSelector.appendChild(option);
        });

        // Show the play/pause button after a song is selected
        songSelector.addEventListener('change', () => {
            playPauseButton.style.display = "inline"; // Show the play/pause button
            playPauseButton.src = "images/play.png"; // Set initial icon to play
            isPlaying = false; // Ensure initial state is not playing
        });
    } catch (error) {
        console.error('Error loading songs:', error);
    }
}

// Fetch GIFs from the custom Flask API based on the user's query
async function fetchGifs(query) {
    const url = `http://127.0.0.1:5000/api/gifs?theme=${query}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const data = await response.json();
        if (data.length === 0) throw new Error("No GIFs found");

        return data;
    } catch (error) {
        console.error("Error fetching GIFs:", error);
        return [];
    }
}

// Play the selected song
async function playSelectedSong() {
    const songSelector = document.getElementById('song-selector');
    const selectedSongUrl = songSelector.value;

    if (audioPlayer) audioPlayer.pause(); // Pause any existing audio

    // Create a new AudioPlayer instance
    audioPlayer = new AudioPlayer(selectedSongUrl);
    isPlaying = true; // Set initial play state to true

    // Update the play/pause button to show the pause icon
    playPauseButton.style.display = "inline";
    playPauseButton.src = "images/pause.png"; // Set to pause icon

    audioPlayer.setKickCallback(() => {
        if (gifUrls.length > 0) {
            const randomIndex = Math.floor(Math.random() * gifUrls.length);
            const selectedGifUrl = gifUrls[randomIndex];

            const gifContainer = document.getElementById('gif-container');
            const img = document.createElement('img');
            img.src = selectedGifUrl;
            gifContainer.innerHTML = ''; // Clear previous GIFs
            gifContainer.appendChild(img); // Add the new GIF
        }
    });

    audioPlayer.play();
}

// Handle play/pause button click
playPauseButton.addEventListener('click', () => {
    if (audioPlayer && isPlaying) {
        audioPlayer.pause();
        playPauseButton.src = "images/play.png"; // Change icon to play
        isPlaying = false;
    } else if (audioPlayer) {
        audioPlayer.play();
        playPauseButton.src = "images/pause.png"; // Change icon to pause
        isPlaying = true;
    }
});

// Handle form submission to play a song and fetch GIFs
document.getElementById('music-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent page reload

    const query = document.getElementById('query-input').value.trim();
    gifUrls = await fetchGifs(query); // Fetch GIFs for the theme and store them

    if (gifUrls.length === 0) {
        document.getElementById('error').classList.remove('inactive');
    } else {
        document.getElementById('error').classList.add('inactive');
        playSelectedSong(); // Play the selected song after fetching GIFs
    }
});

// Initialize the page by loading songs
loadSongs();
