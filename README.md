# 🌦️ WB27 Dynamic Weather Background

### A real-time, zero-backend animated weather environment for the web.

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge\&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Animations-blue?style=for-the-badge\&logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Canvas](https://img.shields.io/badge/HTML5-Canvas-orange?style=for-the-badge\&logo=html5)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![Open-Meteo](https://img.shields.io/badge/Weather-Open--Meteo-00a8e8?style=for-the-badge)](https://open-meteo.com/)
[![CDN](https://img.shields.io/badge/CDN-jsDelivr-purple?style=for-the-badge)](https://www.jsdelivr.com/)
[![No Backend](https://img.shields.io/badge/Backend-Not%20Required-success?style=for-the-badge)](#-architecture)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#-license)

---

## ✨ What is WB27?

**WB27 Dynamic Weather Background** is a client-side animated environment engine that automatically changes a website's background according to the **real-world weather around the visitor**.

Instead of displaying a static background, WB27 creates a complete atmospheric scene using:

* ☀️ Dynamic sunlight
* 🌙 Moon and craters
* ⭐ Animated stars
* ☁️ Moving clouds
* 🌧️ Rain particles
* ❄️ Snow particles
* 💨 Wind streaks
* 🍂 Wind-blown leaves
* 🌅 Day/night environments
* 🌌 Weather-specific gradients
* 🎨 Smooth visual transitions
* 📍 Multi-provider IP geolocation
* 🌦️ Live weather classification
* 🖥️ Full-screen HTML5 Canvas rendering

The entire system runs directly inside the visitor's browser.

> **No application backend is required.**

---

# 🚀 Live Integration

The library can be loaded directly from GitHub through jsDelivr.

### CSS

```html
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/gh/Er-Sumit-Kumar/WB27@main/backgroundWeather.css"
>
```

### Loader

```html
<script
    src="https://cdn.jsdelivr.net/gh/Er-Sumit-Kumar/WB27@main/loadScript.js">
</script>
```

The loader automatically retrieves the remaining WB27 components.

---

# 🎯 Core Concept

WB27 follows this basic pipeline:

```text
┌──────────────────────┐
│     WEBSITE USER     │
└──────────┬───────────┘
           │
           ▼
┌─────────────────────────────┐
│       WB27 LOADER           │
│       loadScript.js         │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ backgroundWeather.html      │
│                             │
│ • Sky layers                │
│ • Sun                       │
│ • Moon                      │
│ • Weather canvas            │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ backgroundWeather.js        │
│       Climate Engine        │
└────────────┬────────────────┘
             │
             ▼
     ┌───────┴────────┐
     │                │
     ▼                ▼
┌─────────────┐  ┌──────────────┐
│ IP LOCATION │  │ WEATHER API  │
│   ENGINE    │  │ Open-Meteo   │
└──────┬──────┘  └──────┬───────┘
       │                │
       └───────┬────────┘
               ▼
      ┌─────────────────┐
      │ CLIMATE ENGINE  │
      └────────┬────────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
   DAY / NIGHT      WEATHER TYPE
       │                │
       └───────┬────────┘
               ▼
      ┌──────────────────┐
      │ VISUAL ENGINE    │
      │                  │
      │ Canvas Particles │
      │ CSS Backgrounds  │
      │ Celestial Bodies │
      └─────────┬────────┘
                │
                ▼
       🌦️ LIVE ENVIRONMENT
```

---

# 🧠 Architecture

WB27 is divided into four major layers.

```text
                    WB27
                      │
       ┌──────────────┼──────────────┐
       │              │              │
       ▼              ▼              ▼
   STRUCTURE       STYLING        LOGIC
       │              │              │
       ▼              ▼              ▼
background       background      background
Weather.html     Weather.css     Weather.js
       │              │              │
       └──────────────┼──────────────┘
                      ▼
              Browser Canvas
                      │
                      ▼
              Animated Weather
```

## Component responsibilities

| File                     | Responsibility                                          |
| ------------------------ | ------------------------------------------------------- |
| `backgroundWeather.html` | Creates the visual DOM layers                           |
| `backgroundWeather.css`  | Controls backgrounds, celestial objects and transitions |
| `backgroundWeather.js`   | Location, weather detection and animation engine        |
| `loadScript.js`          | Dynamically loads the HTML and JavaScript               |
| Host HTML                | Provides the `#backgroundWeather` mounting point        |

---

# 📁 Project Structure

```text
WB27/
│
├── backgroundWeather.html
│
├── backgroundWeather.css
│
├── backgroundWeather.js
│
├── loadScript.js
│
└── README.md
```

---

# 🔄 Loading Sequence

The host website only needs:

```html
<div id="backgroundWeather"></div>
```

followed by:

```html
<script src=".../loadScript.js"></script>
```

The loader then performs:

```text
loadScript.js
      │
      ▼
fetch(backgroundWeather.html)
      │
      ▼
HTML received
      │
      ▼
#backgroundWeather.innerHTML = HTML
      │
      ▼
Create <script>
      │
      ▼
Load backgroundWeather.js
      │
      ▼
Initialize Canvas
      │
      ▼
Start default SUNNY scene
      │
      ▼
Query location providers
      │
      ▼
Determine visitor coordinates
      │
      ▼
Query weather
      │
      ▼
Classify climate
      │
      ▼
Change visual environment
```

This sequencing is important because the JavaScript expects the weather canvas, sky layers, sun and moon elements to already exist.

---

# 🌍 Multi-Provider Location Engine

WB27 does not depend on a single IP-location provider.

The current implementation queries:

```text
1. ipapi.is
2. ipapi.co
3. ipwho.is
4. ip.sb
5. FreeIPAPI
```

The providers are queried concurrently.

```text
                 Browser
                    │
          ┌─────────┼─────────┐
          │         │         │
          ▼         ▼         ▼
       ipapi.is  ipapi.co  ipwho.is
          │         │         │
          └─────────┬─────────┘
                    │
          ┌─────────┴─────────┐
          │                   │
          ▼                   ▼
        ip.sb             FreeIPAPI
          │                   │
          └─────────┬─────────┘
                    ▼
             Location Results
                    │
                    ▼
             Normalize Results
                    │
                    ▼
              Group by City
                    │
                    ▼
           Select Most Frequent
                    │
                    ▼
             Latitude/Longitude
```

---

# 🧩 Location Consensus

Each provider can return slightly different information.

WB27 normalizes provider responses into a common structure:

```javascript
{
    provider: "...",
    city: "...",
    state: "...",
    country: "...",
    latitude: 0,
    longitude: 0
}
```

The engine then groups results by city.

For example:

```text
Provider       City
---------------------------
ipapi.is       Rohtak
ipapi.co       Rohtak
ipwho.is       Rohtak
ip.sb          Rohtak
FreeIPAPI      Delhi
```

The engine identifies:

```text
Rohtak → 4
Delhi  → 1
```

and selects the city with the highest agreement.

This provides a simple consensus mechanism rather than blindly trusting the first provider.

---

# ⏱️ Provider Timeout

Each IP provider has a timeout of:

```text
7000 ms
```

The implementation uses:

```javascript
AbortController
```

to cancel an individual request if it takes too long.

A failed provider returns:

```javascript
null
```

instead of stopping the entire engine.

Therefore:

```text
Provider failure
      │
      ▼
return null
      │
      ▼
other providers continue
      │
      ▼
available results processed
```

---

# 🌦️ Weather Engine

Once coordinates are selected, WB27 requests current weather information.

The weather request contains:

```text
temperature_2m
is_day
precipitation
rain
showers
snowfall
weather_code
cloud_cover
wind_speed_10m
wind_gusts_10m
```

The coordinates are automatically supplied from the location engine.

Conceptually:

```text
Latitude
   +
Longitude
   │
   ▼
Open-Meteo
   │
   ▼
Current Weather
   │
   ├── Rain
   ├── Snow
   ├── Cloud
   ├── Wind
   ├── Weather Code
   └── Day/Night
```

Open-Meteo's current-weather interface supports these categories of variables, including precipitation, rain, showers, snowfall, weather code, cloud cover, wind speed, wind gusts and `is_day`.

---

# 🧠 Climate Classification Engine

The raw weather response is converted into one of five WB27 visual states:

```text
              WEATHER DATA
                    │
                    ▼
          ┌─────────────────┐
          │ CLASSIFIER      │
          └────────┬────────┘
                   │
       ┌───────────┼───────────┐
       ▼           ▼           ▼
     SNOW         RAIN        WIND
       │           │           │
       └───────────┼───────────┘
                   │
             CLOUD / SUNNY
                   │
                   ▼
             VISUAL THEME
```

## Available states

| Status    | Trigger concept                | Visual                |
| --------- | ------------------------------ | --------------------- |
| `SUNNY`   | No stronger weather condition  | Sun / clear sky       |
| `RAINING` | Rain, showers or precipitation | Rain particles        |
| `SNOW`    | Snowfall or snow weather codes | Snow particles        |
| `WIND`    | Strong wind/gust threshold     | Wind streaks + leaves |
| `CLOUD`   | High cloud coverage            | Moving clouds         |

---

# ⚖️ Classification Priority

The engine intentionally checks conditions in this order:

```text
SNOW
  ↓
RAINING
  ↓
WIND
  ↓
CLOUD
  ↓
SUNNY
```

This means a strong precipitation signal is processed before cloud or sunny conditions.

For example:

```text
Snow + Cloud
    ↓
SNOW
```

and:

```text
Rain + Cloud
    ↓
RAINING
```

---

# ☀️🌙 Day/Night Engine

WB27 does not simply determine day/night using the browser clock.

It uses the weather response:

```javascript
isDay = weather.is_day === 1;
```

This controls:

```text
DAY
 │
 ├── Sun
 ├── Bright sky
 └── Day weather colors

NIGHT
 │
 ├── Moon
 ├── Stars
 └── Dark sky
```

---

# 🌅 Background Layer System

There are 10 isolated background layers:

```text
bg-day-sunny
bg-night-sunny

bg-day-cloudy
bg-night-cloudy

bg-day-rainy
bg-night-rainy

bg-day-snowy
bg-night-snowy

bg-day-windy
bg-night-windy
```

The active layer is dynamically selected.

For example:

```text
isDay = true
theme = rainy
```

produces:

```text
bg-day-rainy
```

while:

```text
isDay = false
theme = rainy
```

produces:

```text
bg-night-rainy
```

---

# 🌞 Sun System

The sun is rendered as a CSS celestial object.

It includes:

* Radial gradient
* Glow
* Multiple shadows
* Pulsing animation
* Day/night visibility
* Weather-dependent dimming
* Blur during cloudy conditions

```text
          SUN
           │
     ┌─────┴─────┐
     │           │
   Glow        Pulse
     │           │
     └─────┬─────┘
           ▼
       Day Scene
```

During rain:

```text
SUN
 ↓
Hidden
```

During clouds:

```text
SUN
 ↓
Dimmed + blurred
```

---

# 🌙 Moon System

The moon contains:

```text
Moon body
   │
   ├── Crater 1
   ├── Crater 2
   └── Crater 3
```

The moon becomes visible during the night scene.

It is also reduced or hidden during severe weather conditions.

---

# ⭐ Star Engine

At initialization, WB27 creates:

```text
300 stars
```

Each star contains:

```text
x
y
size
alpha
twinkle speed
angle
```

The stars continuously update their angle to create a subtle twinkling effect.

Stars are hidden during:

```text
RAIN
CLOUD
SNOW
```

to prevent the night scene from visually conflicting with heavy weather.

---

# ☁️ Cloud Engine

Clouds are procedurally generated.

A cloud consists of multiple circular clusters:

```text
        ●
    ●       ●
  ●    ●       ●
      ●    ●
```

Cloud properties include:

```text
position
scale
speed
color
opacity
```

The colors automatically adapt to:

```text
Day
Night
Storm
Cloudy
```

---

# 🌧️ Rain Engine

The rainy scene creates approximately:

```text
350 raindrops
```

Each raindrop has:

```text
x
y
length
speed
opacity
wind slant
```

The animation creates diagonal rain movement.

```text
\
 \
  \
   \
    \
```

Raindrops continuously recycle when they leave the viewport.

---

# ❄️ Snow Engine

The snow scene creates approximately:

```text
400 snowflakes
```

Each snowflake has:

```text
x
y
radius
speed
sway
sway speed
opacity
```

Instead of falling in a perfectly straight line, snowflakes use sinusoidal movement:

```text
    •
     \
      •
     /
    •
     \
      •
```

This creates a more natural drifting effect.

---

# 💨 Wind Engine

The wind scene creates approximately:

```text
150 wind particles
```

There are two particle categories:

```text
70% → Wind streaks
30% → Leaves
```

Wind streaks move rapidly across the screen.

Leaves:

* Rotate
* Drift
* Wave
* Use multiple autumn colors
* Follow turbulent movement

Conceptually:

```text
← WIND
──────────────────────>

🍂       ─────────>
       🍂
──────────────>
             🍂
```

---

# 🎨 Weather Visual Matrix

| Environment     | Sky         | Celestial | Clouds      | Particles     |
| --------------- | ----------- | --------- | ----------- | ------------- |
| ☀️ Sunny Day    | Blue        | Sun       | Light       | None          |
| ☀️ Sunny Night  | Dark purple | Moon      | Light       | Stars         |
| ☁️ Cloudy Day   | Grey/blue   | Dim Sun   | Heavy       | None          |
| ☁️ Cloudy Night | Dark        | Dim Moon  | Heavy       | None          |
| 🌧️ Rainy Day   | Dark grey   | Hidden    | Storm       | Rain          |
| 🌧️ Rainy Night | Very dark   | Hidden    | Storm       | Rain          |
| ❄️ Snowy Day    | Pale        | Dim Sun   | Light       | Snow          |
| ❄️ Snowy Night  | Dark blue   | Dim Moon  | Light       | Snow          |
| 💨 Windy Day    | Cyan/blue   | Sun       | Fast clouds | Wind + leaves |
| 💨 Windy Night  | Deep blue   | Moon      | Fast clouds | Wind + leaves |

---

# 🖥️ Canvas Rendering Pipeline

WB27 uses an HTML5 Canvas for dynamic particles.

```text
requestAnimationFrame()
          │
          ▼
   clearRect()
          │
          ▼
     Draw Stars
          │
          ▼
     Draw Clouds
          │
          ▼
    Draw Wind
          │
          ▼
     Draw Rain
          │
          ▼
     Draw Snow
          │
          ▼
 requestAnimationFrame()
          │
          └──────────────► repeat
```

`requestAnimationFrame()` asks the browser to execute the animation callback before the next repaint and is generally synchronized with the display refresh rate.

---

# 📐 Responsive Rendering

The canvas automatically tracks:

```javascript
window.innerWidth
window.innerHeight
```

When the viewport changes:

```text
resize event
     ↓
update width
     ↓
update height
     ↓
resize canvas
     ↓
reinitialize stars
```

This allows the scene to adapt to:

* Desktop
* Laptop
* Tablet
* Mobile
* Browser resizing
* Orientation changes

---

# 🛡️ Failure Handling

WB27 is designed so that an individual API failure does not necessarily destroy the visual engine.

For example:

```text
ipapi.is ❌
ipapi.co  ✅
ipwho.is  ✅
ip.sb     ❌
FreeIPAPI ✅
```

The successful responses can still be processed.

If weather retrieval fails:

```text
Weather request
      │
      ├── Success → Apply real environment
      │
      └── Failure → Keep default scene
```

The initial visual state is:

```text
SUNNY
```

This prevents an empty page while external data is being retrieved.

---

# 🔐 Privacy Model

WB27 does not require a dedicated WB27 backend.

The browser directly communicates with the configured external APIs.

```text
Visitor Browser
      │
      ├──────────► IP Location APIs
      │
      └──────────► Weather API
```

There is no WB27 server in this architecture collecting the weather result.

However, **external API providers are still separate services**. Their own privacy policies, logging practices, rate limits and terms apply.

Do not describe WB27 as guaranteeing anonymity merely because it has no application backend.

---

# 🌐 Browser Requirements

WB27 relies on modern browser APIs including:

* `fetch()`
* Promises
* `async/await`
* `AbortController`
* HTML5 Canvas
* `requestAnimationFrame()`
* DOM APIs
* CSS transitions
* CSS animations

Modern browsers are recommended.

---

# 📦 Installation

## Step 1 — Create the mount point

```html
<div id="backgroundWeather"></div>
```

## Step 2 — Load the WB27 loader

```html
<script
    src="https://cdn.jsdelivr.net/gh/Er-Sumit-Kumar/WB27@main/loadScript.js">
</script>
```

## Step 3 — Done

The loader will retrieve:

```text
backgroundWeather.html
        ↓
backgroundWeather.js
```

and the CSS is loaded separately.

---

# ⚡ Complete Minimal Integration

```html
<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>WB27 Weather Background</title>

    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/Er-Sumit-Kumar/WB27@main/backgroundWeather.css"
    >

</head>

<body>

    <div id="backgroundWeather"></div>

    <main>
        <h1>My Website</h1>
        <p>
            The background automatically reacts to the visitor's environment.
        </p>
    </main>

    <script
        src="https://cdn.jsdelivr.net/gh/Er-Sumit-Kumar/WB27@main/loadScript.js">
    </script>

</body>
</html>
```

---

# 🎨 Recommended Host-Site CSS

WB27 controls the background, but your website content should remain readable.

Example:

```css
body {
    margin: 0;
    min-height: 100vh;
    color: white;
}

main {
    position: relative;
    z-index: 10;
    min-height: 100vh;

    display: grid;
    place-items: center;

    text-align: center;
}
```

---

# 🧪 Manual Theme Testing

The internal JavaScript engine exposes the weather renderer through:

```javascript
displayClimateStatus({
    status: "SUNNY"
});
```

Available statuses:

```javascript
displayClimateStatus({ status: "SUNNY" });

displayClimateStatus({ status: "RAINING" });

displayClimateStatus({ status: "SNOW" });

displayClimateStatus({ status: "WIND" });

displayClimateStatus({ status: "CLOUD" });
```

This can be useful during development for testing visual states.

---

# 🧩 Example: Weather Demo Controls

A developer can create test controls like:

```html
<button onclick="displayClimateStatus({status:'SUNNY'})">
    ☀️ Sunny
</button>

<button onclick="displayClimateStatus({status:'RAINING'})">
    🌧️ Rain
</button>

<button onclick="displayClimateStatus({status:'SNOW'})">
    ❄️ Snow
</button>

<button onclick="displayClimateStatus({status:'WIND'})">
    💨 Wind
</button>

<button onclick="displayClimateStatus({status:'CLOUD'})">
    ☁️ Cloud
</button>
```

These controls are intended for testing/demo purposes rather than normal production use.

---

# 🏗️ Where WB27 Can Be Used

WB27 can be integrated into:

### 👨‍💻 Developer Portfolios

A developer portfolio can visually react to the visitor's current environment.

```text
Visitor opens portfolio
        ↓
Local environment detected
        ↓
Portfolio background changes
```

### 🌐 Landing Pages

Use atmospheric backgrounds to make a landing page feel dynamic.

### 🖥️ Dashboards

Weather-aware visual environments can be used behind dashboards and monitoring interfaces.

### 🎮 Experimental Web Interfaces

WB27 can provide an environmental layer for creative interfaces.

### 🧪 JavaScript Experiments

It can also be used as a standalone Canvas/CSS weather-animation experiment.

### 📚 Educational Projects

The project demonstrates:

* API integration
* Promise-based networking
* asynchronous JavaScript
* Canvas rendering
* particle systems
* DOM injection
* responsive rendering
* weather classification

---

# 🔌 API Dependencies

| Service      | Purpose         |
| ------------ | --------------- |
| `ipapi.is`   | IP geolocation  |
| `ipapi.co`   | IP geolocation  |
| `ipwho.is`   | IP geolocation  |
| `ip.sb`      | IP geolocation  |
| `FreeIPAPI`  | IP geolocation  |
| `Open-Meteo` | Current weather |

The location providers are queried directly from the visitor's browser.

Open-Meteo's forecast endpoint accepts latitude/longitude and supports current weather variables including the variables used by WB27.

---

# ⚠️ Important API Considerations

WB27 is client-side, so external API availability can affect the detection process.

Possible causes of unexpected behavior include:

```text
API downtime
API rate limits
network restrictions
CORS restrictions
provider response changes
IP geolocation inaccuracies
VPN/proxy usage
corporate networks
mobile carrier NAT
```

IP geolocation is inherently approximate. The consensus mechanism improves resilience against a single inconsistent response but cannot guarantee exact physical location.

---

# 🔧 Customization

The easiest customization points are in:

```text
backgroundWeather.css
```

You can modify:

* Sky colors
* Sun size
* Moon size
* Glow
* Cloud appearance
* Particle opacity
* Transitions
* Weather gradients
* Celestial positioning

The animation engine can be customized in:

```text
backgroundWeather.js
```

You can modify:

* Particle counts
* Particle speeds
* Wind strength
* Cloud density
* Rain density
* Snow density
* Star count
* Weather thresholds
* Classification rules

---

# ⚙️ Current Particle Configuration

```text
Stars
300

Sunny clouds
3

Cloudy clouds
15

Rainy clouds
18
Rain particles
350

Snowy clouds
12
Snow particles
400

Windy clouds
15
Wind particles
150
```

These values can be adjusted according to performance requirements.

---

# 🚀 Performance Notes

The animation system continuously renders particles using Canvas.

For lower-powered devices, consider reducing:

```javascript
300 stars
350 rain
400 snow
150 wind particles
```

For example:

```javascript
for (let i = 0; i < 150; i++) {
    stars.push(new Star());
}
```

The browser's animation scheduling also helps avoid continuously rendering animation callbacks at full speed when the page is hidden in many browsers.

---

# 🧭 Full Data Flow

```text
┌─────────────────────────────┐
│         PAGE LOAD           │
└──────────────┬──────────────┘
               │
               ▼
       loadScript.js
               │
               ▼
     Fetch background HTML
               │
               ▼
      Inject into DOM
               │
               ▼
    Load backgroundWeather.js
               │
               ▼
      Initialize Canvas
               │
               ▼
      Sunny fallback scene
               │
               ▼
   Query 5 IP providers
               │
               ▼
       Normalize results
               │
               ▼
      Group locations
               │
               ▼
      Select consensus
               │
               ▼
      Latitude + Longitude
               │
               ▼
       Open-Meteo request
               │
               ▼
        Current weather
               │
               ▼
       Climate classifier
               │
       ┌───────┼────────┐
       ▼       ▼        ▼
     SNOW     RAIN     WIND
       │       │        │
       └───────┼────────┘
               │
          CLOUD / SUNNY
               │
               ▼
          Day / Night
               │
               ▼
       Select sky layer
               │
               ▼
       Spawn particles
               │
               ▼
       Canvas animation
               │
               ▼
          LIVE SCENE
```

---

# 🔄 State Transition Model

```text
                  ┌──────────┐
                  │  SUNNY   │
                  └────┬─────┘
                       │
       ┌───────────────┼────────────────┐
       │               │                │
       ▼               ▼                ▼
    CLOUDY           RAIN             WIND
       │               │                │
       └───────────────┼────────────────┘
                       │
                       ▼
                     SNOW
```

The actual state is determined from current API data rather than randomly selected.

---

# 🧱 Internal Layers

The visual stack is approximately:

```text
Z-INDEX

   -3    Sky gradient layers
          │
   -2    Sun / Moon
          │
   -1    Canvas particles
          │
    0    Normal document content
          │
   10+   Optional website UI
```

This allows WB27 to remain a background environment rather than replacing the website's content.

---

# 🛠️ Troubleshooting

## Background does not appear

Check:

```html
<div id="backgroundWeather"></div>
```

and make sure the CSS and loader URLs are accessible.

---

## Only the default sunny scene appears

The weather engine may not have received usable location/weather data.

Open DevTools:

```text
F12
→ Console
→ Network
```

Check the IP-location and weather requests.

---

## Rain/snow does not appear

The classification engine depends on the current weather response.

For visual testing:

```javascript
displayClimateStatus({status:"RAINING"});
```

---

## Page content disappears

Your site's content may be behind the background layers.

Give the content a positive stacking context:

```css
main {
    position: relative;
    z-index: 10;
}
```

---

## Animation is heavy

Reduce particle counts in:

```text
backgroundWeather.js
```

especially:

```text
rain
snow
stars
windDebris
```

---

# 🔒 Security Considerations

WB27 does not contain a private API key in the supplied architecture.

That makes it suitable for static hosting.

However:

> **Client-side code cannot keep secrets.**

Do not add private API keys directly to:

```javascript
backgroundWeather.js
```

if those keys must remain confidential.

---

# 🌐 Static Hosting

WB27 is compatible with static hosting environments such as:

```text
GitHub Pages
Static HTML hosting
CDN-hosted websites
Frontend-only projects
Portfolio websites
Documentation websites
```

A backend is not required by the WB27 architecture.

---

# 📜 External Technologies

WB27 uses standard browser technologies:

```text
HTML5
CSS3
JavaScript
DOM
Fetch API
AbortController
HTML5 Canvas
requestAnimationFrame
```

The browser Fetch API provides the network interface used for retrieving JSON resources, while `AbortController` provides cancellation for requests that exceed the configured timeout.

---

# 🧪 Development

Clone the repository:

```bash
git clone https://github.com/Er-Sumit-Kumar/WB27.git
```

Open the project in VS Code.

For local development, serve it through a local HTTP server rather than relying exclusively on `file://`.

Example:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

---

# 📌 CDN Versioning

The examples currently use:

```text
@main
```

This means they follow the repository's main branch.

For production deployments where reproducibility matters, consider pinning your integration to a specific Git commit or release version rather than continuously following `main`.

---

# 🗺️ Future Development Ideas

Possible future extensions include:

```text
☔ Thunderstorm effects
⚡ Lightning flashes
🌫️ Fog
🌈 Rainbow
🌅 Sunrise/sunset transitions
🌌 Better astronomical positioning
🌪️ Storm effects
🌊 Atmospheric haze
🌡️ Temperature-based color grading
🎛️ Public configuration API
📱 Reduced-motion mode
♿ Accessibility controls
⚡ Performance presets
🧩 Plugin architecture
```

---

# 🤝 Contributing

Contributions are welcome.

Suggested workflow:

```text
Fork
  ↓
Create branch
  ↓
Make changes
  ↓
Test all weather states
  ↓
Test desktop + mobile
  ↓
Commit
  ↓
Push
  ↓
Open Pull Request
```

Before submitting a change, verify:

* Sunny works
* Cloudy works
* Rain works
* Snow works
* Wind works
* Day/night works
* Canvas resizes correctly
* API failures do not break the page
* Existing website content remains usable

---

# ⭐ Why WB27?

Traditional website backgrounds:

```text
Static image
      ↓
Same experience
      ↓
Every visitor
```

WB27:

```text
Visitor
   ↓
Location
   ↓
Weather
   ↓
Climate state
   ↓
Dynamic scene
   ↓
Personalized atmosphere
```

The objective is to turn a conventional webpage background into a **living environmental layer**.

---

# 📄 License

Add the project's intended license here before publishing the repository.

For example, if you choose MIT:

```text
MIT License
Copyright (c) 2026 Sumit Kumar
```

Make sure the repository contains the corresponding `LICENSE` file.

---

# 👨‍💻 Author

**Er. Sumit Kumar**

Developer • AI/ML • Web Development • Robotics • Embedded Systems

---

# 🌦️ Final Example

```html
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/gh/Er-Sumit-Kumar/WB27@main/backgroundWeather.css"
>

<div id="backgroundWeather"></div>

<script
    src="https://cdn.jsdelivr.net/gh/Er-Sumit-Kumar/WB27@main/loadScript.js">
</script>
```

That's all the host website needs.

**WB27 handles the rest.**

---

## 📚 Technical References

* MDN Fetch API — browser networking
* MDN AbortController — request cancellation
* MDN requestAnimationFrame — browser animation scheduling
* Open-Meteo — current weather API
