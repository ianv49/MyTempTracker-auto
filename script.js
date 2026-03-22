// 1. Get the drawing area (canvas)
const ctx = document.getElementById('myChart').getContext('2d');

// 2. Create a "Neon Glow" gradient for the background
const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(0, 242, 255, 0.5)'); // Bright neon blue at top
gradient.addColorStop(1, 'rgba(0, 242, 255, 0)');   // Fades to transparent
shadowColor: 'rgba(0, 242, 255, 1)',
shadowBlur: 10,

// 3. Define your data
const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'jFri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Temperature',
    data: [22, 24, 21, 25, 28, 26, 23],
    fill: true,
    backgroundColor: gradient,     // Uses the neon gradient
    borderColor: '#00f2ff',         // Solid neon blue line
    borderWidth: 3,
    pointBackgroundColor: '#00f2ff',
    pointBorderColor: '#fff',
    pointHoverRadius: 8,
    tension: 0.4                   // This makes the line "curvy" and modern
  }]
};

// 4. Configure the "Techie" look
const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false // Hiding the legend looks cleaner
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)' // Very subtle grid lines
        },
        ticks: {
          color: '#888' // Modern grey text
        }
      },
      x: {
        grid: {
          display: false // Hide vertical lines for a minimalist look
        },
        ticks: {
          color: '#888'
        }
      }
    }
  }
};

// 5. Create the chart
const myChart = new Chart(ctx, config);
