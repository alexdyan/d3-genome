const circleA = svg.append("circle")
    .attr("r", 3)
    .attr("fill", "none")
const circleB = svg.append("circle")
    .attr("r", 3)
    .attr("fill", "none")

const calculate = document.querySelector(".calculate-button");
const clear = document.querySelector(".clear-button");
let percent1 = '';
let percent2 = '';

calculate.addEventListener("click", () => {
    let percent1 = document.querySelector(".percent1").value;
    let percent2 = document.querySelector(".percent2").value;
    findRegion(strand.node(), percent1, percent2);
});
clear.addEventListener("click", () => {
    percent1 = document.querySelector(".percent1").value = '';
    percent2 = document.querySelector(".percent2").value = '';
    circleA.style("opacity", 0);
    circleB.style("opacity", 0);
    strand.attr("stroke-dasharray", "2000")
})

function findRegion(path, percent1, percent2) {
    if (percent1 == '' && percent2 == '') return;

    const pathLength = path.getTotalLength();
    const len1 = (percent1/100) * pathLength;
    const len2 = (percent2/100) * pathLength;
    const point1 = path.getPointAtLength(len1);
    const point2 = path.getPointAtLength(len2);
    if (len1 < len2)
        strand.attr("stroke-dasharray", "0 " + len1 + " " + (len2 - len1) + " 2000")
    else
        strand.attr("stroke-dasharray", "0 " + len2 + " " + (len1 - len2) + " 2000")
    circleA.style("opacity", 1)
        .attr("cx", point1.x - 2.5)
        .attr("cy", point1.y - 2.5)
        .attr("fill", "black")
    circleB.style("opacity", 1)
        .attr("cx", point2.x - 2.5)
        .attr("cy", point2.y - 2.5)
        .attr("fill", "black")
}