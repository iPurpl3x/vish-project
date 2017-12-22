import * as d3 from 'd3'
export default function renderBubbles(_data, _id) {

    // If yet no data
    if (!Object.keys(_data || {}).length)
        return

    const data = []
    let totalCount = 0
    for (let key of Object.keys(_data)) {
        data.push({id: key, value: _data[key]})
        totalCount += _data[key]
    }

    const width = document
        .getElementById(_id)
        .offsetWidth

    const colorCircles = d3.scaleOrdinal([
        '#0B4F6C',
        '#01BAEF',
        '#20BF55',
        '#757575',
        '#EF6461',
        '#5F00BA',
        '#3A4F41'
    ])

    document
        .getElementById(_id)
        .innerHTML = ''
    const svg = d3
        .select('#' + _id)
        .append('svg')
        .attr('width', width)
        .attr('height', width)

    const pack = d3
        .pack()
        .size([width, width])
        .padding(1)

    const root = d3
        .hierarchy({children: data})
        .sum(d => d.value)
        .each(d => d.id = d.data.id)

    const node = svg.selectAll('.node')
      .data(pack(root).leaves())
      .enter().append('g')
        .attr('class', 'node')
        .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')

    node
        .append('circle')
        .attr('id', d => d.id)
        .attr('r', d => d.r)
        .style('fill', d => colorCircles(d.id))
        //append hover to circle
        .on("mousemove", d => {
            d3.select('#gender-tooltip')
                .style("left", d3.event.pageX - 50 + "px")
                .style("top", d3.event.pageY - 70 + "px")
                .style("display", "inline-block")
                .html("<b>"+d.id+"</b>"
                    +"</br>"+ d.value)

        })
        .on("mouseout", (d, i) => {
            d3.select('#gender-tooltip').style("display", "none");
        })

    node
        .append('clipPath')
        .attr('id', d => 'clip-' + d.id)
        .append('use')
        .attr('xlink:href', d => '#' + d.id)

    node
        .append('text')
        .attr('clip-path', d => 'url(#clip-' + d.id + ')')
        .selectAll('tspan')
        .data(d => {
            if ((d.r < 30) || (d.r < 38 && d.id.length > 7) || (d.id.length > 23 && d.r < 75) || (d.id.length > 18 && d.r < 39))
                return []
            else
                return d.id.split(' ')
        })
        .enter()
        .append('tspan')
        .attr('x', d => -((d.length / 2) * 7.5))
        .attr('y', (d, i, nodes) => 13 + (i - nodes.length / 2 - 0.5) * 10)
        .attr('font-family', 'monospace')
        .attr('fill', 'white')
        .text(d => d)

}
