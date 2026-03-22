let myChart; // Move this to the top so it's global

window.onload = function() {
    const ctx = document.getElementById('myChart').getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 242, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 242, 255, 0)');

    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Temp',
            data: [22, 24, 21, 25, 28, 26, 23],
            fill: true,
            backgroundColor: gradient,
            borderColor: '#00f2ff',
            borderWidth: 3,
            tension: 0.4
        }]
    };

    myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: '#252525' }, ticks: { color: '#888' } },
                x: { grid: { display: false }, ticks: { color: '#888' } }
            }
        }
    });
};

// Function to add new data
function addTemp() {
    const input = document.getElementById('tempInput');
    const val = parseFloat(input.value);

    if (!isNaN(val)) {
        // Add a new label (Time) and the new value
        const now = new Date();
        const timeLabel = now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');
        
        myChart.data.labels.push(timeLabel);
        myChart.data.datasets[0].data.push(val);
        
        // Remove oldest data point if there are more than 10 (keeps chart clean)
        if (myChart.data.labels.length > 10) {
            myChart.data.labels.shift();
            myChart.data.datasets[0].data.shift();
        }

        myChart.update();
        input.value = ''; // Clear input
    }
}
