function randn_bm() {  
    let u = 0, v = 0;  
    while (u === 0) u = Math.random();  
    while (v === 0) v = Math.random();  
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * 2 | 0;
}

function getRowTemplate(index, number, count) {
    return `
        <tr>
            <td>${index}</td>
            <td>${number}</td>
            <td>${count}</td>
        </tr>
    `;
}

let resultObject = {};
for(let i = 0; i < 100000; i++) {
    let num = randn_bm();
    if (!resultObject[num]) resultObject[num] = 1;
    else resultObject[num]++;
}

const tableBody = document.querySelector('tbody');
let tBodyString = '';

let i = 0;
for(let key in resultObject) {
    const value = resultObject[key];
    tBodyString += getRowTemplate(++i, key, value);
}
tableBody.insertAdjacentHTML('afterbegin', tBodyString);

var data = [
{
    x: Object.keys(resultObject),
    y: Object.values(resultObject),
    type: 'bar'
}
];

Plotly.newPlot(document.querySelector('.distribution__plot'), data);

