<div align="center">
  
  # 🌤️ WB27: Dynamic Real-Time Weather Background
  
  **A zero-dependency HTML5 Canvas engine that auto-detects a user's location and renders a beautiful, animated weather background to match.**

  [![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  [![HTML5 Canvas](https://img.shields.io/badge/HTML5-Canvas-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
  [![Open-Meteo](https://img.shields.io/badge/API-Open--Meteo-0487D9?style=for-the-badge)](https://open-meteo.com/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

  <br />

  <!-- 📸 PREVIEW IMAGE -->
  <img src="https://via.placeholder.com/800x400/0f172a/f8fafc?text=Drop+an+animated+GIF+of+the+weather+effects+here!" alt="WB27 Weather Demo" width="100%" style="border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);">

  <br />

  ### 🚀 [View Live Demo](https://er-sumit-kumar.github.io/WB27/backgroundWeather.html)
</div>

---

## 👁️ Visual Preview & Layer Architecture

The background is composed of three fixed (`z-index: negative`) layers that sit behind your website content:

1. **The Sky Layer (`z-index: -3`):** Dynamic CSS gradients that transition smoothly between Day/Night and 5 different weather states.
2. **The Celestials (`z-index: -2`):** CSS-animated Sun (with pulsing glows) and Moon (with textured craters). Their visibility and opacity react to cloud cover and time of day.
3. **The Particle Canvas (`z-index: -1`):** A 60FPS HTML5 Canvas rendering physics-based particles:
   - Twinkling stars
   - Drifting layered clouds
   - Parallax raindrops
   - Swaying snowflakes
   - Swirling autumn leaves & wind streaks

---

## ⚙️ How It Works: Data Flow

WB27 operates autonomously as soon as the script loads. It relies on a multi-stage fallback system to guarantee the background renders even if an API limit is reached.

### Architecture Diagram

```mermaid
graph TD;
    A([Page Loads]) --> B{1. Geolocation Stage};
    B -->|Ping multiple IP APIs concurrently| C[ipapi.is, ip.sb, FreeIPAPI, etc.];
    C --> D[Select most reliable Lat/Lon];
    
    D --> E{2. Weather Stage};
    E -->|Query via Lat/Lon| F[Open-Meteo Forecast API];
    F --> G[Extract: Temp, Rain, Snow, Wind, Day/Night];
    
    G --> H{3. Logic Stage};
    H -->|Analyze thresholds| I[Determine Climate Status];
    
    I -->|SUNNY, CLOUD, RAINING, SNOW, WIND| J{4. Render Stage};
    J --> K[Update DOM body classes];
    J --> L[Transition Sky Gradients];
    J --> M[Spawn Canvas Particles & Animate];
