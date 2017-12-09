import React, {Component} from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import Section from './Section'
import * as d3 from 'd3'

export default class WorkStartSection extends Component {

    componentDidUpdate() {

        const {workStart} = this.props

        if (!workStart)
            return

        const data = []
        let highestCount = 0
        for (let startTime of Object.keys(workStart)) {
            if (!workStart[startTime])
                continue
            data.push({
                startTime,
                count: workStart[startTime]
            })
            if (workStart[startTime] > highestCount) {
                highestCount = workStart[startTime]
            }
        }

        const width = 500,
            height = 500,
            radius = Math.min(width, height) / 2,
            innerRadius = 0

        const pie = d3
            .pie()
            .sort(null)
            .value(1)

        const timeCount = d3
            .scalePow().exponent(0.2)
            .domain([0, highestCount])
            .range([0, radius])

        const arc = d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(function (d) {
                return timeCount(d.data.count)
            })

        const outlineArc = d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(radius)

        document
            .getElementById('work-time-radial')
            .innerHTML = ''
        const svg = d3
            .select("#work-time-radial")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

        const outerPath = svg
            .selectAll(".outlineArc")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("fill", "none")
            .attr("stroke", "gray")
            .attr("class", "outlineArc")
            .attr("d", outlineArc)

        const path = svg
            .selectAll(".solidArc")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("fill", '#20BF55')
            .attr("class", "solidArc")
            .attr("stroke", "white")
            .attr("d", arc)
        }

        render() {
            const {index, up, down} = this.props
            return (<Section index={index} up={() => up(index)} down={() => down(index)}>
                <h3>{'Work starting time'}</h3>
                <div id='work-time-radial' className='flex-center'>
                    <CircularProgress />
                </div>
            </Section>)
        }
    }
