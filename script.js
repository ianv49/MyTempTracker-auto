// 1. Generate 24 hours of random data
const hours = Array.from({length: 24}, (_, i) => `${i}:00`);
const temps = Array.from({length: 24}, () => (Math.random() * (30 - 15) + 15).toFixed(1));

// 2. Populate the Table
const tableBody = document.querySelector('#tempTable tbody');
hours.forEach((hour, index) => {
    let row = `<tr><td>${hour}</td><td>${temps[index]}°C</td></tr>`;
    tableBody.innerHTML += row;
});

// 3. Create the Chart
const ctx = document.getElementById('tempChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: hours,
        datasets: [{
            label: 'Temperature over 24 Hours',
            data: temps,
            borderColor: '#007AFF', // iPhone Blue
            tension: 0.3
        }]
    }
});

