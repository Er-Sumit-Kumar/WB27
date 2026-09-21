<div align="center">
  
  # 🌤️ WB27: Dynamic Real-Time Weather Background
  
  **A zero-dependency, plug-and-play HTML5 Canvas engine that auto-detects a user's real-world location and renders a beautiful, animated weather background to match.**

  [![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  [![HTML5 Canvas](https://img.shields.io/badge/HTML5-Canvas-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
  [![Open-Meteo](https://img.shields.io/badge/API-Open--Meteo-0487D9?style=for-the-badge)](https://open-meteo.com/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

  <br />

  <!-- 📸 REPLACE THIS IMAGE LINK WITH A GIF OF YOUR BACKGROUND IN ACTION -->
  <img src="https://via.placeholder.com/800x400/0f172a/f8fafc?text=Drop+an+animated+GIF+of+the+weather+effects+here!" alt="WB27 Weather Demo" width="100%" style="border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);">

  <br />

  ### 🚀 [View Live Demo](https://er-sumit-kumar.github.io/WB27/backgroundWeather.html)
</div>

---

## ✨ Features

- **🌍 Auto-Geolocation:** Intelligently queries multiple fallback IP providers to find the user's city/coordinates reliably.
- **☁️ Real-Time Climate:** Fetches live data from the Open-Meteo API (temperature, rain, snow, cloud cover, wind speed).
- **🌗 Day/Night Cycle:** Automatically tracks the sun and moon phases based on the user's local timezone.
- **🎨 High-Performance Particles:** Custom HTML5 Canvas engine rendering rain, snow, twinkling stars, and swirling autumn leaves at 60FPS.
- **📦 Zero Dependencies:** No React, no jQuery, no heavy libraries. Pure Vanilla JavaScript and CSS.

---

## 🌩️ Supported Weather States

The engine automatically transitions CSS gradients, celestial bodies (Sun/Moon), and Canvas particles for:

| Weather | Day Mode | Night Mode | Particle Effects |
| :--- | :--- | :--- | :--- |
| **Sunny** | ☀️ Clear blue skies | 🌕 Clear starry night | Pulsing Sun, Craters on Moon, Twinkling Stars |
| **Cloudy** | 🌥️ Overcast gradients | ☁️ Darkened skies | Layered, animated drifting clouds (speed adjusted) |
| **Rainy** | 🌧️ Gray/Stormy skies | ⛈️ Deep dark blues | Heavy rain streaks, dark clouds, hidden celestials |
| **Snowy** | 🌨️ Icy white/blue | ❄️ Cold midnight blue | Drifting snowflakes with wind sway |
| **Windy** | 🍃 Bright blown skies | 🌬️ Deep turbulent skies| Swirling leaves, fast clouds, wind streaks |

---

## 🛠️ Installation & Usage

### Method 1: The Plug-and-Play Script (Recommended)
Add this directly to your website. It handles all the background layers, canvas injection, and API calls automatically.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Weather App</title>
    
    <!-- 1. Include the WB27 Stylesheet -->
    <link rel="stylesheet" href="[https://cdn.jsdelivr.net/gh/Er-Sumit-Kumar/WB27@main/backgroundWeather.css](https://cdn.jsdelivr.net/gh/Er-Sumit-Kumar/WB27@main/backgroundWeather.css)">
</head>
<body>
    
    <!-- 2. Create the container div -->
    <div id="backgroundWeather"></div>
    
    <!-- Your website content goes here -->
    <div style="position: relative; z-index: 10;">
        <h1>Welcome to my site</h1>
        <p>The background matches your weather!</p>
    </div>
    
    <!-- 3. Load the WB27 Script at the end of the body -->
    <script src="[https://cdn.jsdelivr.net/gh/Er-Sumit-Kumar/WB27@main/loadScript.js](https://cdn.jsdelivr.net/gh/Er-Sumit-Kumar/WB27@main/loadScript.js)"></script>
</body>
</html>
