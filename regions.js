const circleA = svg.append("circle")
    .attr("r", 5)
    .attr("fill", "none")
const circleB = svg.append("circle")
    .attr("r", 5)
    .attr("fill", "none")

function findRegion(path, percent1, percent2) {
    const pathLength = path.getTotalLength();
    const point1 = path.getPointAtLength((percent1/100) * pathLength);
    const point2 = path.getPointAtLength((percent2/100) * pathLength);
    circleA.attr("cx", point1.x - 2.5)
        .attr("cy", point1.y - 2.5)
        .attr("fill", "black")
    circleB.attr("cx", point2.x - 2.5)
        .attr("cy", point2.y - 2.5)
        .attr("fill", "black")
}