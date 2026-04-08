/**
 * SeeteeS MOD // Intelligence Charts
 * Visualization for Luxury Market Data Q1 2026
 * Updated for Obsidian V6 (Dark Luxury Edition)
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
            color: '#fdfcf9', // Ivory text for dark mode
            font: {
              family: "'IBM Plex Mono', monospace",
              size: 10
            },
            usePointStyle: true,
            boxWidth: 6
          }
        },
        tooltip: {
          backgroundColor: 'rgba(10, 10, 10, 0.9)',
          titleColor: '#fdfcf9',
          bodyColor: '#fdfcf9',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          titleFont: { family: "'IBM Plex Mono', monospace" },
          bodyFont: { family: "'Inter', sans-serif" },
          padding: 12,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + context.parsed.y + '%';
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            font: { family: "'IBM Plex Mono', monospace", size: 10 },
            color: '#999'
          }
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: {
            font: { family: "'IBM Plex Mono', monospace", size: 10 },
            color: '#999',
            callback: function(value) { return value + '%'; }
          }
        }
      }
    }
  });
}

// Data injection for Q1 2026 Performance (Normalized 100-base)
document.addEventListener('DOMContentLoaded', () => {
  const labels = ['02 GEN', '30 GEN', '27 FEB', '31 MAR', '08 APR'];
  
  const hermesData = [100, 95.06, 88.13, 74.35, 82.42]; 
  const lvmhData = [100, 95.25, 83.11, 71.95, 77.25];    
  
  const datasets = [
    {
      label: 'Hermès (RMS)',
      data: hermesData,
      borderColor: '#c42c4e', // Heritage Red
      backgroundColor: 'rgba(196, 44, 78, 0.05)',
      borderWidth: 1.5,
      pointRadius: 2,
      pointBackgroundColor: '#c42c4e',
      tension: 0.4,
      fill: true
    },
    {
      label: 'LVMH Group (MC)',
      data: lvmhData,
      borderColor: 'rgba(255, 255, 255, 0.7)', // Ghost White
      borderWidth: 1.5,
      borderDash: [5, 5],
      pointRadius: 0,
      tension: 0.4,
      fill: false
    }
  ];

  initPerformanceChart('market-performance-chart', labels, datasets);
});
