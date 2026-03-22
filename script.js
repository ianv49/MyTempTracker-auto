window.onload = async function() {
    try {
        const response = await fetch('data.txt?t=' + Date.now());
        const text = await response.text();
        const entries = text.split('|');
        
        let labels = [], temps = [];

        entries.forEach(entry => {
            const [time, temp] = entry.split(',');
            if(time && temp) {
                labels.push(time);
                temps.push(parseFloat(temp));
            }
        });

        // 1. Calculations
        const avg = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
        const maxVal = Math.max(...temps);
        document.getElementById('avgTemp').innerText = avg + "°C";
        document.getElementById('maxTemp').innerText = maxVal + "°C";

        // 2. Chart 1: Timeline
        const ctx1 = document.getElementById('myChart').getContext('2d');
        // Only take the last 10 entries so it fits the screen without scrolling
        const recentLabels = labels.slice(-10);
        const recentTemps = temps.slice(-10);

        new Chart(ctx1, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    data: temps,
                    borderColor: '#00f2ff',
                    backgroundColor: 'rgba(0, 242, 255, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: temps.map(t => t === maxVal ? '#ff4d4d' : '#00f2ff'),
                    pointRadius: temps.map(t => t === maxVal ? 7 : 4)
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { 
                        beginAtZero: false, 
                        title: { display: true, text: '°C', color: '#888' },
                        grid: { color: '#252525' }, 
                        ticks: { color: '#888' } 
                    },
                    x: { title: { display: true, text: 'Hour', color: '#888' }, ticks: { color: '#888' } }
                }
            }
        });

        // 3. Chart 2: Pareto (Top 10 Descending)
        const combined = labels.map((l, i) => ({ l, t: temps[i] }));
        combined.sort((a, b) => b.t - a.t);
        const top10 = combined.slice(0, 10);

        const ctx2 = document.getElementById('paretoChart').getContext('2d');
        new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: top10.map(d => d.l),
                datasets: [{
                    data: top10.map(d => d.t),
                    backgroundColor: '#7000ff',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { title: { display: true, text: '°C' }, grid: { color: '#252525' }, ticks: { color: '#888' } },
                    x: { title: { display: true, text: 'Peak Hours' }, ticks: { color: '#888' } }
                }
            }
        });

    } catch (e) { console.error("Data error:", e); }
};
