// app.js

// Select HTML elements
const videoUpload = document.getElementById("video-upload");
const video = document.getElementById("video");
const startTimeInput = document.getElementById("start-time");
const endTimeInput = document.getElementById("end-time");
const trimButton = document.getElementById("trim-video");

// Event listener to load video file
videoUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        video.src = fileURL;
        video.load();

        // Set the default end time to the video's duration once it loads
        video.onloadedmetadata = () => {
            endTimeInput.value = video.duration.toFixed(2);
        };
    }
});

// Trimming functionality
trimButton.addEventListener("click", () => {
    const startTime = parseFloat(startTimeInput.value);
    const endTime = parseFloat(endTimeInput.value);

    if (startTime < 0 || endTime > video.duration || startTime >= endTime) {
        alert("Please enter valid start and end times.");
        return;
    }

    // Set the video to play only within the specified range
    video.currentTime = startTime;
    
    // Stop playback when the end time is reached
    video.ontimeupdate = () => {
        if (video.currentTime >= endTime) {
            video.pause();
        }
    };

    video.play();
});
