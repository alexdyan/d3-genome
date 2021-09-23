const width = 500;
const height = 500;
const svg = d3.select("#svg1")
    .attr("width", width)
    .attr("height", height);

const graph = {
    nodes: [
        {name: "A", age: 23},
        {name: "B", age: 30},
        {name: "C", age: 18},
        {name: "D", age: 10},
        {name: "E", age: 10},
        {name: "F", age: 18},
        {name: "G", age: 10},
        {name: "H", age: 10},
        {name: "I", age: 23},
        {name: "J", age: 30},
        {name: "K", age: 18},
        {name: "L", age: 10},
        {name: "M", age: 10},
        {name: "N", age: 18},
        {name: "O", age: 10},
        {name: "P", age: 10},
    ],
    links: [
        {source: "A", target: "B"},
        {source: "A", target: "D"},
        {source: "A", target: "K"},
        {source: "B", target: "C"},
        {source: "C", target: "D"},
        {source: "C", target: "H"},
        {source: "D", target: "E"},
        {source: "F", target: "H"},
        {source: "G", target: "C"},
        {source: "G", target: "L"},
        {source: "I", target: "G"},
        {source: "J", target: "M"},
        {source: "J", target: "I"},
        {source: "M", target: "O"},
        {source: "M", target: "K"},
        {source: "N", target: "K"},
        {source: "P", target: "I"},
    ]
};

const simulation = d3.forceSimulation()
    .force("link", d3.forceLink()
        // specify how to find the node sources bc they default to index (we want them by name)
        .id(function(d) { return d.name }))
    .force("charge", d3.forceManyBody().strength(-100))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on("tick", update);

const link = svg
    .append("g")
    .attr("class", "link")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line") // could use path instead of line
    .style("stroke", "gray")

const node = svg
    .append("g")
    .attr("class", "node")
    .data(graph.nodes)


simulation.nodes(graph.nodes);
simulation.force("link").links(graph.links);

let strand = svg
    .append("path")
    .attr("class", "strand")
    .attr("fill", "none")
    .attr("stroke-width", 3)
    .attr("stroke", "red")

function update() {
    link.attr("x1", function(l) { return l.source.x })
    .attr("y1", function(l) { return l.source.y })
    .attr("x2", function(l) { return l.target.x })
    .attr("y2", function(l) { return l.target.y })

    node.attr("cx", function(n) { return n.x })
        .attr("cy", function(n) { return n.y })

    const path = d3.path();
    const curve = d3.curveCatmullRom(path);
    curve.lineStart();
    for (let i = 0; i < graph.nodes.length; i++) {
        curve.point(graph.nodes[i].x, graph.nodes[i].y);
    }
    curve.lineEnd();
    svg.selectAll(".strand").attr("d", path);

}



// no way to set the strength of individual links, the strength is based on the distance
// between links and nodes and nodes... bigger set distance = smaller strength