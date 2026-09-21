    fetch('https://cdn.jsdelivr.net/gh/Er-Sumit-Kumar/WB27@main/backgroundWeather.html')
        .then(response => response.text())
        .then(data => {
            // 1. Inject the HTML
            document.getElementById('backgroundWeather').innerHTML = data;
            
            // 2. Load the main logic script ONLY after the HTML is in place
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/gh/Er-Sumit-Kumar/WB27@main/backgroundWeather.js';
            document.body.appendChild(script);
        });
