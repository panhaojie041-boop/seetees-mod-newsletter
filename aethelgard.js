// Aethelgard Terminal Engine [v1.0]
const terminalInit = () => {
    const heroTitle = document.querySelector('.hero-copy h2');
    if (!heroTitle) return;

    const originalText = "[init_aethelgard] " + heroTitle.innerText;
    heroTitle.innerText = '';
    heroTitle.style.opacity = '1';
    heroTitle.classList.remove('reveal');

    let i = 0;
    const speed = 40;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTitle.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Add terminal cursor
            heroTitle.innerHTML += '<span class="cursor">_</span>';
        }
    };
    
    // Initial delay for system boot simulation
    setTimeout(() => {
        console.log('[AETHELGARD_SYSTEM_BOOT]');
        typeWriter();
    }, 800);
};

// The Code of Trend - D3.js Network Visualization
const initTrendNetwork = (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Load D3.js dynamically if not present
    if (typeof d3 === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://d3js.org/d3.v7.min.js';
        script.onload = () => renderNetwork(container);
        document.head.appendChild(script);
    } else {
        renderNetwork(container);
    }

    function renderNetwork(container) {
        const width = container.clientWidth;
        const height = 400;

        const svg = d3.select(container)
            .append('svg')
            .attr('width', '100%')
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`);

        const nodes = [
            { id: 'Streetwear', group: 1 },
            { id: 'Cyberpunk', group: 1 },
            { id: 'Bio-Fabric', group: 2 },
            { id: '3D-Print', group: 2 },
            { id: 'Luxe', group: 3 },
            { id: 'Sustainability', group: 3 },
            { id: 'Aethelgard', group: 0 }
        ];

        const links = [
            { source: 'Aethelgard', target: 'Streetwear' },
            { source: 'Aethelgard', target: 'Bio-Fabric' },
            { source: 'Streetwear', target: 'Cyberpunk' },
            { source: 'Bio-Fabric', target: '3D-Print' },
            { source: 'Aethelgard', target: 'Luxe' },
            { source: 'Luxe', target: 'Sustainability' }
        ];

        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(120))
            .force('charge', d3.forceManyBody().strength(-400))
            .force('center', d3.forceCenter(width / 2, height / 2));

        const link = svg.append('g')
            .attr('stroke', '#00ff41')
            .attr('stroke-opacity', 0.4)
            .selectAll('line')
            .data(links)
            .join('line')
            .attr('stroke-width', 1);

        const node = svg.append('g')
            .selectAll('circle')
            .data(nodes)
            .join('circle')
            .attr('r', 6)
            .attr('fill', d => d.id === 'Aethelgard' ? '#ff00ff' : '#00ff41')
            .attr('stroke', '#fff')
            .attr('stroke-width', 1);

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

        // Add Resize Listener
        window.addEventListener('resize', () => {
            const newWidth = container.clientWidth;
            svg.attr('viewBox', `0 0 ${newWidth} ${height}`);
            simulation.force('center', d3.forceCenter(newWidth / 2, height / 2));
            simulation.alpha(0.3).restart();
        });
    }
};

// CAD Hover Effect Engine
const initCADHover = () => {
    const targets = document.querySelectorAll('.hero-media, .news-row-img-container');
    targets.forEach(target => {
        target.style.position = 'relative';
        target.style.overflow = 'hidden';

        const overlay = document.createElement('div');
        overlay.className = 'cad-overlay';
        overlay.innerHTML = `
            <div class="cad-grid"></div>
            <div class="cad-frame"></div>
            <div class="cad-data">
                <p>[MODEL_SCAN: ACTIVE]</p>
                <p>[MESH_DENSITY: HIGH]</p>
                <p>[MATERIAL: TECH_SILK_V2]</p>
                <p>[LATITUDE: 45.4642 N]</p>
            </div>
        `;
        target.appendChild(overlay);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    terminalInit();
    initTrendNetwork('trend-network-container');
    initCADHover();
});
