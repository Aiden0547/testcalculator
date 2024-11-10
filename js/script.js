function parseInput(input) {
    return new Set(input.split(',').map(Number));
}

function updateVenn(setA, setB, resultSet) {
    const sets = [
        { sets: ['A'], size: setA.size, label: `A: {${Array.from(setA).join(", ")}}` },
        { sets: ['B'], size: setB.size, label: `B: {${Array.from(setB).join(", ")}}` },
        { sets: ['A', 'B'], size: resultSet.size, label: `Result: {${Array.from(resultSet).join(", ")}}` }
    ];

    d3.select("#venn").selectAll("*").remove(); // 기존 다이어그램 제거
    const chart = venn.VennDiagram();
    d3.select("#venn").datum(sets).call(chart);

    d3.selectAll("#venn .venn-circle path")
        .style("fill-opacity", 0.5);

    d3.selectAll("#venn .venn-circle text")
        .style("font-size", "16px")
        .style("fill", "black");
}

function calculateUnion() {
    const setA = parseInput(document.getElementById("setA").value);
    const setB = parseInput(document.getElementById("setB").value);
    const result = new Set([...setA, ...setB]);
    document.getElementById("result").textContent = Array.from(result).join(", ");
    updateVenn(setA, setB, result);
}

function calculateIntersection() {
    const setA = parseInput(document.getElementById("setA").value);
    const setB = parseInput(document.getElementById("setB").value);
    const result = new Set([...setA].filter(x => setB.has(x)));
    document.getElementById("result").textContent = Array.from(result).join(", ");
    updateVenn(setA, setB, result);
}

function calculateDifference() {
    const setA = parseInput(document.getElementById("setA").value);
    const setB = parseInput(document.getElementById("setB").value);
    const result = new Set([...setA].filter(x => !setB.has(x)));
    document.getElementById("result").textContent = Array.from(result).join(", ");
    updateVenn(setA, setB, result);
}

function calculateSymmetricDifference() {
    const setA = parseInput(document.getElementById("setA").value);
    const setB = parseInput(document.getElementById("setB").value);
    const union = new Set([...setA, ...setB]);
    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const result = new Set([...union].filter(x => !intersection.has(x)));
    document.getElementById("result").textContent = Array.from(result).join(", ");
    updateVenn(setA, setB, result);
}
