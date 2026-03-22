let myChart;

window.onload = async function() {
    // 1. Fetch the data from your Git file
    const response = await fetch('data.txt');
    const text = await response.text();
    const gitData = text.split(',').map(Number); // Converts text to numbers

    const ctx = document.getElementById('myChart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 242, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 242, 255, 0)');

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Temp',
                data: gitData, // USES DATA FROM DATA.TXT
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
};
