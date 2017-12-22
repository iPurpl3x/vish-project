import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CircularProgress from 'material-ui/CircularProgress'
import Section from './Section'
import * as d3 from 'd3'

export default class ChangeWorldSection extends Component {

    static get contextTypes() {
        return {
            compareId: PropTypes.number
        }
    }

    renderGraph() {
        const {changeWorld} = this.props
        const {compareId} = this.context

        if (!changeWorld)
            return

        const data = []
        let highestCount = 0
        const keys = [
            "NA",
            "Strongly disagree",
            "Disagree",
            "Somewhat agree",
            "Agree",
            "Strongly agree"
        ]
        for (let agreeing of keys) {
            if (!changeWorld[agreeing])
                continue
            const stack = 0
            if (data.length)
                stack = data[data.length-1].stack
            data.push({
                agreeing,
                stack: changeWorld[agreeing]+stack,
                count: changeWorld[agreeing]
            })
        }
        //console.log(data)

        const width = 600,
            height = 50

        const x = d3
            .scaleLinear()
            .domain([0, data[data.length-1].stack])
            .range([0, width])

        const o = d3
            .scaleLinear()
            .domain([0, data.length])
            .range([0.25, 1.2])

        document
            .getElementById('change-world-chart'+compareId)
            .innerHTML = ''
        const svg = d3
            .select("#change-world-chart"+compareId)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            //.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

        const rect = svg
            .selectAll(".solidArc")
            .data(data)
            .enter()
            .append("rect")
            .attr("fill", (d, i) => i==0? '#757575' :'#20BF55')
            .attr('opacity', (d, i) => o(i))
            .attr("width", d => x(d.count))
            .attr('x', (d, i) => i==0?0:x(data[i-1].stack))
            .attr("height", height)
            .attr("class", "solidArc")
            .attr("stroke", "white")
            .on("mousemove", (d, i) => {
                d3.select('#gender-tooltip')
                    .style("left", d3.event.pageX - 50 + "px")
                    .style("top", d3.event.pageY - 85 + "px")
                    .style("display", "inline-block")
                    .style("color", 'rgba(0,0,0,'+Math.max(0.3 ,o(i))+')')
                    .html("<b>"+d.agreeing+"</b>"
                        +"<br>Number of respondants: " +d.count.toLocaleString()
                        +"<br>("
                        +((d.count/data[data.length-1].stack)*100).toFixed(2)
                        +" %)")

            })
            .on("mouseout", (d, i) => {
                d3.select('#gender-tooltip').style("display", "none");
            })

    }

    render(){
        const {index, up, down, data_schema} = this.props
        const {compareId} = this.context

        setImmediate(this.renderGraph.bind(this))

        let question = ''
        if (data_schema) {
            for (let q of data_schema) {
                if (q.Column == 'ChangeWorld'){
                    question = q.Question
                    break
                }
            }
        }
        return (
            <Section
                index={index}
                up={() => up(index)}
                down={() => down(index)}>
                <h3 style={{
                    marginBottom: 20,
                    fontStyle: 'italic'
                }} className='flex-center'>{data_schema?'"'+question+'"':''}</h3>
                <div id={'change-world-chart'+compareId} className='flex-center'>
                    <CircularProgress />
                </div>
            </Section>
        )
    }
}
