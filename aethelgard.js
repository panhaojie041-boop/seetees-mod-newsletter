// Aethelgard Terminal Engine [v10.0] - Mechanical/Industrial Simulation
const terminalInit = () => {
    const statusEl = document.getElementById('terminal-status');
    const heroTitle = document.querySelector('.hero-title');
    if (!statusEl || !heroTitle) return;

    // Reset Title for effect
    const originalTitle = heroTitle.innerHTML;
    heroTitle.style.opacity = '0';

    const messages = [
        '[BOOT_V10.0.1_STABLE]',
        '[CHECKING_GRID_SYSTEMS]... OK',
        '[LOADING_BRUTALIST_UI]... OK',
        '[SCANNING_TRENDS_LIBRARY]...',
        '[3D_KNITTING_v2.5] detected',
        '[BIO_SYNTH_CELL_v1.2] detected',
        '[HOLO_TEXT_NEO_09] detected',
        '[HAPTIC_PERF_88] detected',
        '[SYSTEM_ONLINE]'
    ];
    
    let msgIndex = 0;
    const nextMessage = () => {
        if (msgIndex < messages.length) {
            statusEl.textContent = messages[msgIndex];
            msgIndex++;
            // Mechanical typewriter speed
            setTimeout(nextMessage, 150 + Math.random() * 200);
        } else {
            // Show title with mechanical snap
            heroTitle.style.opacity = '1';
        }
    };
    
    setTimeout(nextMessage, 500);
};

// Brutalist Trend Network - Black & Rigid
const initTrendNetwork = (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    function renderNetwork(container) {
        const width = container.clientWidth;
        const height = container.clientHeight || 600;

        d3.select(container).selectAll("svg").remove();

        const svg = d3.select(container)
            .append('svg')
            .attr('width', '100%')
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`);

        const nodes = [
            { id: '3D_KNIT', group: 1 },
            { id: 'BIO_LEATHER', group: 1 },
            { id: 'HOLO_TEX', group: 2 },
            { id: 'HAPTIC_88', group: 2 },
            { id: 'SUPPLY_CHAIN', group: 3 },
            { id: 'AETHELGARD_CORE', group: 0 }
        ];

        const links = [
            { source: 'AETHELGARD_CORE', target: '3D_KNIT' },
            { source: 'AETHELGARD_CORE', target: 'BIO_LEATHER' },
            { source: '3D_KNIT', target: 'HAPTIC_88' },
            { source: 'BIO_LEATHER', target: 'SUPPLY_CHAIN' },
            { source: 'AETHELGARD_CORE', target: 'HOLO_TEX' }
        ];

        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(150))
            .force('charge', d3.forceManyBody().strength(-800))
            .force('center', d3.forceCenter(width / 2, height / 2));

        const link = svg.append('g')
            .attr('stroke', '#000000')
            .attr('stroke-opacity', 0.1)
            .selectAll('line')
            .data(links)
            .join('line')
            .attr('stroke-width', 2);

        const node = svg.append('g')
            .selectAll('rect')
            .data(nodes)
            .join('rect')
            .attr('width', 12)
            .attr('height', 12)
            .attr('x', -6)
            .attr('y', -6)
            .attr('fill', d => d.id === 'AETHELGARD_CORE' ? '#ff4500' : '#000000');

        const text = svg.append('g')
            .selectAll('text')
            .data(nodes)
            .join('text')
            .text(d => d.id)
            .attr('font-size', '10px')
            .attr('fill', '#000000')
            .attr('font-family', 'IBM Plex Mono, monospace')
            .attr('font-weight', '700')
            .attr('dx', 15)
            .attr('dy', 5);

        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node
                .attr('transform', d => `translate(${d.x},${d.y})`);

            text
                .attr('x', d => d.x)
                .attr('y', d => d.y);
        });

        window.addEventListener('resize', () => {
            const newWidth = container.clientWidth;
            svg.attr('viewBox', `0 0 ${newWidth} ${height}`);
            simulation.force('center', d3.forceCenter(newWidth / 2, height / 2));
            simulation.alpha(0.3).restart();
        });
    }

    renderNetwork(container);
};

document.addEventListener('DOMContentLoaded', () => {
    terminalInit();
    initTrendNetwork('trend-network-container');
});
