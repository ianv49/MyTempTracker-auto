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
const ctx = document.getElementById('myChart').getContext('2d');
const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(0, 242, 255, 0.5)'); // Neon blue at top
gradient.addColorStop(1, 'rgba(0, 242, 255, 0)');   // Fades to transparent
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
options: {
  responsive: true,
  plugins: {
    legend: { display: false } // Techie charts often hide the legend
  },
  scales: {
    y: {
      grid: { color: '#252525' }, // Subtle dark grid lines
      ticks: { color: '#888' }    // Grey text for a cleaner look
    },
    x: {
      grid: { display: false }    // Hide vertical lines for "cleaner" look
    }
  },
  elements: {
    line: {
      tension: 0.4,               // Makes the line curvy/smooth
      borderWidth: 3,
      borderColor: '#00f2ff',     // The neon line
      fill: true,
      backgroundColor: gradient   // Uses the gradient we made above
    },
    point: {
      radius: 4,
      hoverRadius: 8,
      backgroundColor: '#00f2ff'
    }
  }
}
});
