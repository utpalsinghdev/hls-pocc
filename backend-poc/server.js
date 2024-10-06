const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

// Define the directory for the HLS files
const HLS_DIR = path.join(__dirname, 'hls', "assets_m3u8");

// Serve the HLS manifest file (.m3u8) and segments (.ts)
app.get('/api/videos/:videoName', (req, res) => {
    const { videoName } = req.params;
    const filePath = path.join(HLS_DIR, videoName);

    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.sendFile(filePath);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`HLS streaming backend running on port ${PORT}`);
});