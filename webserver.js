<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MQTT Camera Feed</title>
    <style>
        #camera-feed {
            width: 100%;
            max-width: 600px;
        }
    </style>
</head>
<body>
    <h1>MQTT Camera Feed</h1>
    <img id="camera-feed" src="/latest_image" alt="Camera Feed" />

    <script>
        // Function to refresh image when a new image is available
        function updateImage() {
            // Append a timestamp to prevent browser caching
            const imgElement = document.getElementById('camera-feed');
            imgElement.src = '/latest_image?' + new Date().getTime();
        }

        // Refresh the image every 30ms (or whenever a new image is available)
        setInterval(updateImage, 30);
    </script>
</body>
</html>
