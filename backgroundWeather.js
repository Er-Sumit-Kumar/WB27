        /* =========================================================
           WEATHER & LOCATION API CONFIGURATION
           ========================================================= */
        const IP_PROVIDERS = [
            { name: "ipapi.is", url: "https://api.ipapi.is/" },
            { name: "ipapi.co", url: "https://ipapi.co/json/" },
            { name: "ipwho.is", url: "https://ipwho.is/" },
            { name: "ip.sb", url: "https://api.ip.sb/geoip" },
            { name: "FreeIPAPI", url: "https://free.freeipapi.com/api/v1/json" }
        ];

        const REQUEST_TIMEOUT = 7000;

        async function initializeClimateStatus() {
            try {
                const results = await Promise.all(
                    IP_PROVIDERS.map(provider => queryIPProvider(provider))
                );
                const locations = results.filter(Boolean);
                if (!locations.length) return;

                const bestLocation = selectBestLocation(locations);
                if (typeof bestLocation.latitude !== "number" || typeof bestLocation.longitude !== "number") return;

                const weather = await getWeather(bestLocation.latitude, bestLocation.longitude);
                if (!weather) return;

                const climate = calculateClimateStatus(weather);
                
                // Set exact day/night from real API data
                isDay = weather.is_day === 1; 

                displayClimateStatus(climate);
            } catch (error) {
                console.error("Climate engine error:", error);
            }
        }

        async function queryIPProvider(provider) {
            try {
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
                const response = await fetch(provider.url, {
                    method: "GET",
                    headers: { "Accept": "application/json" },
                    signal: controller.signal
                });
                clearTimeout(timeout);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json();
                return normalizeLocation(provider.name, data);
            } catch (error) {
                return null;
            }
        }

        function normalizeLocation(provider, data) {
            let location = {
                provider: provider, city: null, state: null, country: null,
                latitude: null, longitude: null
            };

            if (provider === "ipapi.is") {
                location.city = data.location?.city || data.city;
                location.state = data.location?.state || data.region;
                location.country = data.location?.country || data.country;
                location.latitude = numberOrNull(data.location?.latitude ?? data.latitude);
                location.longitude = numberOrNull(data.location?.longitude ?? data.longitude);
            } else if (provider === "ipapi.co") {
                location.city = data.city; location.state = data.region; location.country = data.country_name;
                location.latitude = numberOrNull(data.latitude); location.longitude = numberOrNull(data.longitude);
            } else if (provider === "ipwho.is") {
                if (data.success === false) return null;
                location.city = data.city; location.state = data.region; location.country = data.country;
                location.latitude = numberOrNull(data.latitude); location.longitude = numberOrNull(data.longitude);
            } else if (provider === "ip.sb") {
                location.city = data.city; location.state = data.region; location.country = data.country;
                location.latitude = numberOrNull(data.latitude); location.longitude = numberOrNull(data.longitude);
            } else if (provider === "FreeIPAPI") {
                location.city = data.cityName || data.city; location.state = data.regionName || data.region;
                location.country = data.countryName || data.country;
                location.latitude = numberOrNull(data.latitude); location.longitude = numberOrNull(data.longitude);
            }

            if (!location.city && !location.state && !location.country) return null;
            return location;
        }

        function selectBestLocation(locations) {
            const cityGroups = {};
            locations.forEach(location => {
                if (!location.city) return;
                const city = normalizeText(location.city);
                if (!cityGroups[city]) cityGroups[city] = { count: 0, locations: [] };
                cityGroups[city].count++;
                cityGroups[city].locations.push(location);
            });

            let cityWinner = null;
            Object.keys(cityGroups).forEach(city => {
                const group = cityGroups[city];
                if (!cityWinner || group.count > cityWinner.count) {
                    cityWinner = { city: city, count: group.count, locations: group.locations };
                }
            });

            if (cityWinner) {
                const coordinateLocation = cityWinner.locations.find(
                    loc => typeof loc.latitude === "number" && typeof loc.longitude === "number"
                );
                if (coordinateLocation) return coordinateLocation;
            }

            const countryLocation = locations.find(
                loc => typeof loc.latitude === "number" && typeof loc.longitude === "number"
            );
            return countryLocation || locations[0];
        }

        async function getWeather(latitude, longitude) {
            const url = "https://api.open-meteo.com/v1/forecast" +
                `?latitude=${encodeURIComponent(latitude)}` +
                `&longitude=${encodeURIComponent(longitude)}` +
                "&current=temperature_2m,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_gusts_10m" +
                "&timezone=auto";

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Weather HTTP ${response.status}`);
                const data = await response.json();
                return data.current || null;
            } catch (error) {
                return null;
            }
        }

        function calculateClimateStatus(weather) {
            const code = Number(weather.weather_code);
            const rain = Number(weather.rain || 0);
            const showers = Number(weather.showers || 0);
            const snowfall = Number(weather.snowfall || 0);
            const precipitation = Number(weather.precipitation || 0);
            const cloud = Number(weather.cloud_cover || 0);
            const wind = Number(weather.wind_speed_10m || 0);
            const gust = Number(weather.wind_gusts_10m || 0);

            if (snowfall > 0 || [71, 73, 75, 77, 85, 86].includes(code)) return { status: "SNOW" };
            if (rain > 0 || showers > 0 || precipitation > 0 || 
                [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code)) {
                return { status: "RAINING" };
            }
            if (wind >= 35 || gust >= 50) return { status: "WIND" };
            if (cloud >= 70 || [3].includes(code)) return { status: "CLOUD" };
            
            return { status: "SUNNY" };
        }

        function numberOrNull(value) {
            const number = Number(value);
            return Number.isFinite(number) ? number : null;
        }

        function normalizeText(value) {
            return String(value).trim().toLowerCase().replace(/\s+/g, " ");
        }

        /* =========================================================
           VISUAL SIMULATOR ENGINE
           ========================================================= */

        const body = document.body;
        const canvas = document.getElementById('weather-canvas');
        const ctx = canvas.getContext('2d', { alpha: true });
        
        let width = window.innerWidth;
        let height = window.innerHeight;
        let isDay = true; 
        let currentTheme = 'sunny';
        let animationFrameId;

        // Particle Storage Arrays
        let stars = [];
        let clouds = [];
        let rain = [];
        let snow = [];
        let windDebris = [];

        class Star {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 1.5 + 0.5;
                this.baseAlpha = Math.random() * 0.5 + 0.1;
                this.twinkleSpeed = Math.random() * 0.03 + 0.01;
                this.angle = Math.random() * Math.PI * 2;
            }
            update() {
                this.angle += this.twinkleSpeed;
            }
            draw(ctx) {
                // Stars fade out completely during bad weather
                if (currentTheme === 'rainy' || currentTheme === 'cloudy' || currentTheme === 'snowy') return;
                
                const alpha = this.baseAlpha + Math.sin(this.angle) * 0.4;
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, alpha)})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        class Cloud {
            constructor(isDark, speedMultiplier) {
                this.x = Math.random() * width;
                this.y = Math.random() * (height * 0.45); 
                this.scale = Math.random() * 0.8 + 0.4;
                this.speed = (Math.random() * 0.4 + 0.1) * speedMultiplier;
                
                // Color dynamically adjusts based on Day/Night and Weather type
                let r, g, b, alpha;
                if (isDay) {
                    if (isDark) { r=160; g=170; b=180; alpha=0.9; } // Stormy day cloud
                    else { r=255; g=255; b=255; alpha=0.8; } // Fluffy day cloud
                } else {
                    if (isDark) { r=30; g=35; b=45; alpha=0.9; } // Stormy night cloud
                    else { r=80; g=90; b=110; alpha=0.6; } // Night cloud
                }
                
                this.color = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                
                // Create random fluffy clusters
                this.clusters = [
                    { x: 0, y: 0, r: 40 },
                    { x: 40, y: -15, r: 50 },
                    { x: 80, y: 0, r: 45 },
                    { x: 30, y: 15, r: 35 },
                    { x: 60, y: 15, r: 35 }
                ];
            }
            update() {
                this.x += this.speed;
                if (this.x - 120 * this.scale > width) {
                    this.x = -150 * this.scale;
                    this.y = Math.random() * (height * 0.45);
                }
            }
            draw(ctx) {
                ctx.fillStyle = this.color;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.scale(this.scale, this.scale);
                
                ctx.beginPath();
                for (let cluster of this.clusters) {
                    ctx.moveTo(cluster.x, cluster.y);
                    ctx.arc(cluster.x, cluster.y, cluster.r, 0, Math.PI * 2);
                }
                ctx.fill();
                ctx.restore();
            }
        }

        class Raindrop {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height - height;
                this.length = Math.random() * 20 + 15;
                this.speed = Math.random() * 15 + 15;
                this.windSlant = 3; 
                this.opacity = Math.random() * 0.4 + 0.2;
            }
            update() {
                this.y += this.speed;
                this.x += this.windSlant;
                if (this.y > height) {
                    this.y = -this.length;
                    this.x = Math.random() * width;
                }
            }
            draw(ctx) {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.windSlant, this.y + this.length);
                ctx.strokeStyle = `rgba(180, 210, 255, ${this.opacity})`;
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        }

        class Snowflake {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height - height;
                this.radius = Math.random() * 2.5 + 1;
                this.speed = Math.random() * 2 + 1;
                this.sway = Math.random() * Math.PI * 2;
                this.swaySpeed = Math.random() * 0.02 + 0.01;
                this.opacity = Math.random() * 0.7 + 0.3;
            }
            update() {
                this.y += this.speed;
                this.sway += this.swaySpeed;
                this.x += Math.sin(this.sway) * 1.2;
                if (this.y > height) {
                    this.y = -10;
                    this.x = Math.random() * width;
                }
            }
            draw(ctx) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        class WindParticle {
            constructor() {
                this.reset();
                // Distribute across screen initially so it doesn't start empty
                this.x = Math.random() * width; 
            }

            reset() {
                this.x = -100 - Math.random() * 200;
                this.y = Math.random() * height;
                this.type = Math.random(); // 30% leaves, 70% wind streaks
                
                if (this.type < 0.3) {
                    this.isLeaf = true;
                    this.size = Math.random() * 6 + 4; 
                    this.speedX = Math.random() * 10 + 8; // Fast drift
                    this.speedY = (Math.random() - 0.2) * 2;
                    this.waveAngle = Math.random() * Math.PI * 2;
                    this.waveSpeed = Math.random() * 0.1 + 0.05;
                    this.rotSpeed = (Math.random() - 0.5) * 0.5;
                    this.rotation = Math.random() * Math.PI * 2;
                    
                    // Vibrant autumn colors
                    const colors = ['#d97706', '#ea580c', '#9a3412', '#ca8a04', '#65a30d'];
                    this.color = colors[Math.floor(Math.random() * colors.length)];
                    this.opacity = Math.random() * 0.8 + 0.2;
                } else {
                    this.isLeaf = false;
                    this.size = Math.random() * 80 + 30; // Length of the wind streak
                    this.speedX = Math.random() * 25 + 15; // Very fast air
                    this.speedY = (Math.random() - 0.5) * 1;
                    this.opacity = Math.random() * 0.2 + 0.05; 
                    this.thickness = Math.random() * 2 + 1;
                }
            }
            
            update() {
                this.x += this.speedX;
                
                if (this.isLeaf) {
                    this.rotation += this.rotSpeed;
                    this.waveAngle += this.waveSpeed;
                    // Layered sine and cosine for erratic, turbulent swirling
                    let swirl = Math.sin(this.waveAngle) * 3 + Math.cos(this.waveAngle * 0.5) * 2;
                    this.y += this.speedY + swirl;
                } else {
                    this.y += this.speedY;
                }
                
                // Reset if it goes off screen
                if (this.x > width + 100 || this.y > height + 100 || this.y < -100) {
                    this.reset();
                }
            }
            
            draw(ctx) {
                ctx.save();
                if (this.isLeaf) {
                    ctx.translate(this.x, this.y);
                    ctx.rotate(this.rotation);
                    ctx.globalAlpha = this.opacity;
                    ctx.fillStyle = this.color;
                    
                    // Draw a realistic leaf shape using bezier curves
                    ctx.beginPath();
                    ctx.moveTo(0, -this.size);
                    ctx.quadraticCurveTo(this.size, 0, 0, this.size);
                    ctx.quadraticCurveTo(-this.size, 0, 0, -this.size);
                    ctx.fill();
                } else {
                    // Draw ethereal wind streak
                    ctx.globalAlpha = this.opacity;
                    ctx.strokeStyle = '#e2e8f0'; // Light silverish white
                    ctx.lineWidth = this.thickness;
                    ctx.lineCap = 'round';
                    
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(this.x + this.size, this.y);
                    ctx.stroke();
                }
                ctx.restore();
            }
        }

        function initStars() {
            stars = [];
            for (let i = 0; i < 300; i++) {
                stars.push(new Star());
            }
        }

        function updateBackgroundLayer() {
            // Hide all background layers
            document.querySelectorAll('.sky-layer').forEach(layer => layer.classList.remove('active'));
            
            // Construct the ID for the isolated background (e.g., bg-day-sunny)
            const timeStr = isDay ? 'day' : 'night';
            const targetId = `bg-${timeStr}-${currentTheme}`;
            
            // Activate the correct background layer
            const targetLayer = document.getElementById(targetId);
            if (targetLayer) {
                targetLayer.classList.add('active');
            }
        }

        function setWeather(theme) {
            currentTheme = theme;
            
            // Update body classes for CSS UI logic (Sun/Moon visibility)
            body.className = `${isDay ? 'is-day' : 'is-night'} theme-${theme}`;
            
            // Switch to the isolated background gradient
            updateBackgroundLayer();

            // Clear active particles
            clouds = [];
            rain = [];
            snow = [];
            windDebris = [];

            // Spawn new particles based on selected weather
            switch(theme) {
                case 'sunny':
                    // Just 1-2 small slow clouds for depth
                    for(let i=0; i<3; i++) clouds.push(new Cloud(false, 0.4));
                    break;
                case 'cloudy':
                    for(let i=0; i<15; i++) clouds.push(new Cloud(true, 1));
                    break;
                case 'rainy':
                    for(let i=0; i<18; i++) clouds.push(new Cloud(true, 1.3));
                    for(let i=0; i<350; i++) rain.push(new Raindrop());
                    break;
                case 'snowy':
                    for(let i=0; i<12; i++) clouds.push(new Cloud(false, 0.7));
                    for(let i=0; i<400; i++) snow.push(new Snowflake());
                    break;
                case 'windy':
                    for(let i=0; i<15; i++) clouds.push(new Cloud(false, 4.0)); // Faster, more clouds
                    for(let i=0; i<150; i++) windDebris.push(new WindParticle()); // Much more debris
                    break;
            }
        }

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            
            // Re-distribute stars across new screen size
            initStars(); 
        }

        window.addEventListener('resize', resize);
        
        // Purely triggers the graphic engine now, no text UI is updated.
        window.displayClimateStatus = function(climate) {
            switch (climate.status) {
                case "SUNNY": setWeather('sunny'); break;
                case "RAINING": setWeather('rainy'); break;
                case "SNOW": setWeather('snowy'); break;
                case "WIND": setWeather('windy'); break;
                case "CLOUD": setWeather('cloudy'); break;
            }
        };

        function animate() {
            // Clear canvas completely each frame
            ctx.clearRect(0, 0, width, height);

            // 1. Draw Stars Background (Only if Night)
            if (!isDay) {
                for (let star of stars) {
                    star.update();
                    star.draw(ctx);
                }
            }

            // 2. Draw Clouds
            for (let cloud of clouds) {
                cloud.update();
                cloud.draw(ctx);
            }

            // 3. Draw Foreground Weather Particles
            for (let p of windDebris) { p.update(); p.draw(ctx); }
            for (let r of rain) { r.update(); r.draw(ctx); }
            for (let s of snow) { s.update(); s.draw(ctx); }

            animationFrameId = requestAnimationFrame(animate);
        }

        // Initialize empty state, then start fetching real world data
        resize(); 
        setWeather('sunny'); // Default state while loading
        animate(); 
        
        // Kick off your API chain
        initializeClimateStatus();