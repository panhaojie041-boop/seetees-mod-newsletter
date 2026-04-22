// Aethelgard Terminal Engine [v1.0]
const terminalInit = () => {
    const statusEl = document.getElementById('terminal-status');
    if (!statusEl) return;

    const messages = [
        '[init_system_v1.0]...',
        '[loading_trend_compiler]...',
        '[detecting:3d_knitting_v2.5]...',
        '[detecting:bio_synth_cell_v1.2]...',
        '[detecting:holo_text_neo_09]...',
        '[detecting:haptic_perf_text_88]...',
        '[detecting:dt_supply_reset_v4]...',
        '[connecting_seetees_ai_core]...',
        '[system_ready]'
    ];
    let msgIndex = 0;

    const nextMessage = () => {
        if (msgIndex < messages.length) {
            statusEl.textContent = messages[msgIndex];
            msgIndex++;
            setTimeout(nextMessage, 1000 + Math.random() * 1000);
        }
    };
    nextMessage();
};

// The Code of Trend - D3.js Network Visualization
const initTrendNetwork = (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    function renderNetwork(container) {
        const width = container.clientWidth;
        const height = 400;

        d3.select(container).selectAll("svg").remove();

        const svg = d3.select(container)
            .append('svg')
            .attr('width', '100%')
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`);

        const nodes = [
            { id: '3D_KNITTING', group: 1 },
            { id: 'BIO_SYNTH_CELL', group: 1 },
            { id: 'HOLO_TEXT_NEO', group: 2 },
            { id: 'HAPTIC_PERF_TEXT', group: 2 },
            { id: 'DT_SUPPLY_RESET', group: 3 },
            { id: 'AETHELGARD_CORE', group: 0 }
        ];

        const links = [
            { source: 'AETHELGARD_CORE', target: '3D_KNITTING' },
            { source: 'AETHELGARD_CORE', target: 'BIO_SYNTH_CELL' },
            { source: '3D_KNITTING', target: 'HAPTIC_PERF_TEXT' },
            { source: 'BIO_SYNTH_CELL', target: 'DT_SUPPLY_RESET' },
            { source: 'AETHELGARD_CORE', target: 'HOLO_TEXT_NEO' },
            { source: 'HOLO_TEXT_NEO', target: '3D_KNITTING' }
        ];

        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(150))
            .force('charge', d3.forceManyBody().strength(-500))
            .force('center', d3.forceCenter(width / 2, height / 2));

        const link = svg.append('g')
            .attr('stroke', '#00ff41')
            .attr('stroke-opacity', 0.2)
            .selectAll('line')
            .data(links)
            .join('line')
            .attr('stroke-width', 1);

        const node = svg.append('g')
            .selectAll('circle')
            .data(nodes)
            .join('circle')
            .attr('r', 5)
            .attr('fill', d => d.id === 'AETHELGARD_CORE' ? '#ff00ff' : '#00ff41')
            .attr('filter', 'drop-shadow(0 0 5px #00ff41)');

        const text = svg.append('g')
            .selectAll('text')
            .data(nodes)
            .join('text')
            .text(d => d.id)
            .attr('font-size', '10px')
            .attr('fill', '#ffffff')
            .attr('font-family', 'IBM Plex Mono, monospace')
            .attr('dx', 12)
            .attr('dy', 4);

        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);

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

    if (typeof d3 !== 'undefined') {
        renderNetwork(container);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    terminalInit();
    initTrendNetwork('trend-network-container');
});
