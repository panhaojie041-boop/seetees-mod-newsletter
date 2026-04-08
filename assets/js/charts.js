/**
 * SeeteeS MOD // Intelligence Charts
 * Visualization for Luxury Market Data Q1 2026
 */

function initPerformanceChart(containerId, dataLabels, datasets) {
  const ctx = document.getElementById(containerId);
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dataLabels,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            font: {
              family: "'IBM Plex Mono', monospace",
              size: 10
            },
            usePointStyle: true,
            boxWidth: 6
          }
        },
        tooltip: {
          backgroundColor: '#1a1a1a',
          titleFont: { family: "'IBM Plex Mono', monospace" },
          bodyFont: { family: "'Inter', sans-serif" },
          padding: 12,
          displayColors: false
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            font: { family: "'IBM Plex Mono', monospace", size: 10 },
            color: '#666'
          }
        },
        y: {
          grid: { color: 'rgba(26, 26, 26, 0.05)' },
          ticks: {
            font: { family: "'IBM Plex Mono', monospace", size: 10 },
            color: '#666',
            callback: function(value) { return value + '%'; }
          }
        }
      }
    }
  });
}

// Data injection for Q1 2026 Performance
document.addEventListener('DOMContentLoaded', () => {
  const labels = ['Gen', 'Feb', 'Mar', 'Apr (Est)'];
  
  const hermesData = [100, 108.5, 114.2, 119.8]; // Normalized 100 base
  const lvmhData = [100, 102.1, 98.4, 96.2];    // Great Reset impact
  
  const datasets = [
    {
      label: 'Hermès (RMS)',
      data: hermesData,
      borderColor: '#c42c4e',
      backgroundColor: 'rgba(196, 44, 78, 0.1)',
      borderWidth: 2,
      tension: 0.3,
      fill: true
    },
    {
      label: 'LVMH Group (MC)',
      data: lvmhData,
      borderColor: '#1a1a1a',
      borderWidth: 2,
      borderDash: [5, 5],
      tension: 0.3,
      fill: false
    }
  ];

  initPerformanceChart('market-performance-chart', labels, datasets);
});
