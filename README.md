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

## ⚙️ Core Architecture & Data Flow

WB27 operates autonomously. It relies on a multi-stage fallback system to guarantee the background renders even if an IP API limit is reached.

```mermaid
flowchart TD
    classDef trigger fill:#1e293b,stroke:#cbd5e1,stroke-width:2px,color:#fff,rx:5px,ry:5px;
    classDef api fill:#3b82f6,stroke:#1d4ed8,stroke-width:2px,color:#fff,rx:5px,ry:5px;
    classDef process fill:#10b981,stroke:#047857,stroke-width:2px,color:#fff,rx:5px,ry:5px;
    classDef render fill:#8b5cf6,stroke:#6d28d9,stroke-width:2px,color:#fff,rx:5px,ry:5px;

    Start([🚀 Initialization]) :::trigger

    subgraph Geo["🌍 Stage 1: Geolocation"]
        direction TB
        Start --> IPs{Concurrent IP Queries}
        IPs -->|ipapi.is| IP1[IP Data] :::api
        IPs -->|ip.sb| IP2[IP Data] :::api
        IPs -->|FreeIPAPI| IP3[IP Data] :::api
        IP1 & IP2 & IP3 --> Validate[Select Most Accurate Lat/Lon] :::process
    end

    subgraph Meteo["☁️ Stage 2: Meteorology"]
        direction TB
        Validate -->|Coordinates| OM(Open-Meteo API) :::api
        OM --> Extract[Extract: Temp, Rain, Snow, Wind, Day/Night] :::process
    end

    subgraph Engine["🎨 Stage 3: Rendering Engine"]
        direction TB
        Extract --> Logic{Climate Logic Thresholds} :::process
        Logic -->|Wind > 35km/h| StateWind[State: WIND]
        Logic -->|Snow > 0| StateSnow[State: SNOW]
        Logic -->|Default| StateClear[State: SUNNY/CLOUD]
        
        StateWind & StateSnow & StateClear --> DOM[Update DOM Theme Classes] :::render
        DOM --> BG[CSS: Dynamic Sky Gradients] :::render
        DOM --> Celestials[CSS: Sun/Moon Fade Transitions] :::render
        DOM --> Canvas[Canvas 2D: Spawn Weather Particles] :::render
    end
