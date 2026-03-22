let myChart;

window.onload = async function() {
    try {
        // 1. Fetch data from Git (adding a timestamp to URL prevents caching)
        const response = await fetch('data.txt?t=' + Date.now());
        const text = await response.text();
        
        // 2. Parse the new format (Time,Temp|Time,Temp)
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

        const ctx = document.getElementById('myChart').getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(0, 242, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(0, 242, 255, 0)');

        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    data: temps,
                    fill: true,
                    backgroundColor: gradient,
                    borderColor: '#00f2ff',
                    borderWidth: 3,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { grid: { color: '#252525' }, ticks: { color: '#888' } },
                    x: { grid: { display: false }, ticks: { color: '#888' } }
                }
            }
        });
    } catch (error) {
        console.error("Error loading data:", error);
    }
};

// This function now just reminds you how to save!
function addTemp() {
    alert("To Save: Open data.txt in GitHub and add: |Time,Temp");
}
