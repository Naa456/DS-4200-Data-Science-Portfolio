// Interactive D3.js bar chart. Values are illustrative, not actual student records.
const practiceHours = [
  { topic: 'Python', hours: 7 },
  { topic: 'Visualization', hours: 5 },
  { topic: 'Statistics', hours: 4 },
  { topic: 'SQL', hours: 3 },
  { topic: 'Communication', hours: 4 }
];

function drawChart() {
  const host = document.getElementById('study-chart');
  const status = document.getElementById('chart-fallback');
  if (!host || typeof d3 === 'undefined') {
    if (status) status.textContent = 'The chart needs an internet connection to load D3.js.';
    return;
  }

  const width = 820, height = 385;
  const margin = { top: 34, right: 24, bottom: 85, left: 58 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const svg = d3.select(host).append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('role', 'img')
    .attr('aria-label', 'Illustrative hours spent on Python 7, Visualization 5, Statistics 4, SQL 3, and Communication 4');
  const chart = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
  const x = d3.scaleBand().domain(practiceHours.map(d => d.topic)).range([0, innerWidth]).padding(0.36);
  const y = d3.scaleLinear().domain([0, 8]).range([innerHeight, 0]);

  chart.append('g').attr('class', 'grid')
    .call(d3.axisLeft(y).ticks(4).tickSize(-innerWidth).tickFormat(''));
  chart.append('g').attr('class', 'axis').call(d3.axisLeft(y).ticks(4));
  chart.append('g').attr('class', 'axis')
    .attr('transform', `translate(0,${innerHeight})`).call(d3.axisBottom(x).tickSize(0))
    .selectAll('text').attr('dy', '1.3em');
  chart.append('text').attr('x', -innerHeight / 2).attr('y', -43)
    .attr('transform', 'rotate(-90)').attr('text-anchor', 'middle')
    .attr('fill', '#52627f').attr('font-size', 13).text('Hours (sample)');

  chart.selectAll('.bar').data(practiceHours).enter().append('rect')
    .attr('class', 'bar').attr('x', d => x(d.topic)).attr('y', d => y(d.hours))
    .attr('width', x.bandwidth()).attr('height', d => innerHeight - y(d.hours))
    .attr('rx', 7).attr('tabindex', 0)
    .append('title').text(d => `${d.topic}: ${d.hours} example hours`);

  chart.selectAll('.bar-label').data(practiceHours).enter().append('text')
    .attr('class', 'bar-label').attr('x', d => x(d.topic) + x.bandwidth() / 2)
    .attr('y', d => y(d.hours) - 10).attr('text-anchor', 'middle')
    .text(d => `${d.hours}h`);
  if (status) status.textContent = 'This chart uses sample data for demonstration only.';
}

drawChart();
