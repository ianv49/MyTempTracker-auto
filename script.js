let myChart;

window.onload = async function() {
    try {
        const response = await fetch('data.txt?t=' + Date.now());
        const text = await response.text();
        const entries = text.split('|');
        const labels = [];
        const temps = [];

        entries.forEach(entry => {
            const [time, temp] = entry.split(',');
            if(time && temp) {
                labels.push(time);
                temps.push(parseFloat(temp));
            }
        });

        // FIND MAX VALUE: Determine which dot should be red
        const maxVal = Math.max(...temps);
        const pointColors = temps.map(t => t === maxVal ? '#ff4d4d' : '#00f2ff');
        const pointRadii = temps.map(t => t === maxVal ? 8 : 4);

        const ctx = document.getElementById('myChart').getContext('2d');
        
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Temp',
                        data: temps,
                        fill: true,
                        backgroundColor: 'rgba(0, 242, 255, 0.1)',
                        borderColor: '#00f2ff',
                        borderWidth: 3,
                        tension: 0.4,
                        pointBackgroundColor: pointColors, // Red for max
                        pointRadius: pointRadii           // Bigger for max
                    },
                    {
                        label: 'Goal Line',
                        data: Array(labels.length).fill(30), // Horizontal line at 30
                        borderColor: 'rgba(255, 77, 77, 0.5)',
                        borderDash: [5, 5], // Dotted line
                        borderWidth: 2,
                        fill: false,
                        pointRadius: 0 // Hide dots on goal line
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Helps with mobile scrolling
                plugins: { legend: { display: false } },
                scales: {
                    y: { 
                        suggestedMax: 35, 
                        grid: { color: '#252525' }, 
                        ticks: { color: '#888' } 
                    },
                    x: { 
                        grid: { display: false }, 
                        ticks: { color: '#888' },
                        min: labels.length > 10 ? labels.length - 10 : 0 // SCROLL EFFECT
                    }
                }
            }
        });
    } catch (e) { console.error(e); }
};
