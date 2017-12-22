import React, {Component} from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import Section from './Section'
import './AvgSalSection.css'
import * as d3 from 'd3'

export default class AvgSalSection extends Component {

    renderGraph() {
        const {perGender, genderCounts} = this.props

        // If yet no data
        if (!Object.keys(perGender).length) return

        const data = []
        let totalCount = 0
        for (let gender of ['NA', 'Male', 'Female', 'Other']) {
            if (!perGender[gender]) continue
            data.push({
                gender,
                avg_salary: perGender[gender].avg_salary,
                count: genderCounts[gender]
            })
            totalCount += genderCounts[gender]
        }

        data.sort((a, b) => parseInt(b.avg_salary)-parseInt(a.avg_salary))

        // Define colors
        // https://coolors.co/20bf55-0b4f6c-fffaff-01baef-757575
        const colors = {
            Other:'#0B4F6C',
            Male:'#01BAEF',
            Female:'#20BF55',
            NA:'#757575'
        }
        // set the dimensions and margins of the graph
        const margin = {
                top: 20,
                right: 20,
                bottom: 50,
                left: 50
            },
            width = 400 - margin.left - margin.right,
            height = 180 - margin.top - margin.bottom

        // set the ranges
        const y = d3
            .scaleBand()
            .range([height, 0])
            .padding(0.1)

        const x = d3
            .scaleLinear()
            .range([0, width])

        // append the svg object to the body of the page
        // append a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        document.getElementById('gender-bar-chart').innerHTML = ''
        let svg = d3
            .select('#gender-bar-chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
        svg
            .append('text')
            .text('Gender')
            .attr('font-size', 13)
            .attr('font-weight', 'bold')
            .attr('fill', 'black')
            .attr('transform', 'translate(0,11)')
        svg = svg
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

        // Scale the range of the data in the domains
        x.domain([ 0, d3.max(data, d => d.count) ])
        y.domain(data.map(d => d.gender))

        // append the rectangles for the bar chart
        svg
            .selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            //.attr('x', function(d) { return x(d.count); })
            .attr('width', d => x(d.count))
            .attr('y', d => y(d.gender))
            .attr('height', y.bandwidth())
            .attr('fill', d => colors[d.gender])
            .on("mousemove", d => {
                d3.select('#gender-tooltip')
                    .style("left", d3.event.pageX - 50 + "px")
                    .style("top", d3.event.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .style("color", colors[d.gender])
                    .html("Number of respondants: " +d.count.toLocaleString()
                        +"<br>("
                        +((d.count/totalCount)*100).toFixed(2)
                        +" %)")

            })
            .on("mouseout", (d, i) => {
                d3.select('#gender-tooltip').style("display", "none");
            })

        // add the x Axis
        svg
            .append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x))
                .selectAll('text')
                .style('text-anchor', 'end')
                .attr('font-family', 'monospace')
                .attr('dx', '-1.2em')
                .attr('dy', '.14em')
                .attr('transform', 'rotate(-65)')

        // add the y Axis
        svg
            .append('g')
            .call(d3.axisLeft(y))
                .selectAll('text')
                .attr('font-family', 'monospace')



        // avg salary per gender

        // set the ranges
        const sal_y = d3
            .scaleBand()
            .range([height, 0])
            .padding(0.1)

        const sal_x = d3
            .scaleLinear()
            .range([0, width])

        document.getElementById('gender-avg-sal').innerHTML = ''
        let sal_svg = d3
            .select('#gender-avg-sal')
            .append('svg')
            .attr('width', 80)
            .attr('height', height + margin.top + margin.bottom)
        sal_svg
            .append('text')
            .text('Avg. salary')
            .attr('font-size', 13)
            .attr('font-weight', 'bold')
            .attr('fill', 'black')
            .attr('transform', 'translate(0,11)')
        sal_svg = sal_svg
            .append('g')
            .attr('transform', 'translate(0,' + margin.top + ')')

        sal_svg
            .selectAll('.avg_sal')
            .data(data)
            .enter()
            .append('text')
                .text(d => isNaN(d.avg_salary)
                    ? ""
                    : parseInt(d.avg_salary).toLocaleString()+' $'
                )
                .attr('class', 'avg_sal')
                .attr('font-size', 16)
                .attr('font-family', 'monospace')
                .attr('width', 40)
                .attr('transform', 'translate(0,12)')
                .attr('fill', d => colors[d.gender])
                .attr('y', d => y(d.gender))
                .attr('height', y.bandwidth())
    }

    render() {
        const {index, up, down, avgSalary, perGender} = this.props

        setImmediate(this.renderGraph.bind(this))

        if (!perGender) {
            return null
        }

        const chartData = []
        for (let gender in perGender) {
            chartData.push({label: gender, avg_salary: perGender[gender].avg_salary})
        }
        //console.log(chartData)

        const chartSeries = [
            {
                field: 'avg_salary',
                name: 'Average salary'
            }
        ]

        const x = d => d.label
        const xScale = 'ordinal'
        const yTicks = [10, '%']

        return (<Section index={index} id={index + '_s'} up={() => up(index)} down={() => down(index)}>
            <div className='Section-body'>
                <div className='flex-center' style={{flexDirection: 'row'}}>
                    <div id='gender-bar-chart' className='flex-center'>
                        <CircularProgress />
                    </div>
                    <div id='gender-avg-sal'></div>
                    <div id='gender-tooltip'></div>
                </div>
                <GlobalAvg avgSalary={avgSalary}/>
            </div>
        </Section>)
    }
}

const GlobalAvg = (props) => (
    <div className='flex-center' style={{borderLeft: 'solid 1px rgba(0,0,0,0.6)'}}>
        <h4 style={{marginTop: 0, marginBottom: 12}}>Average salary (global)</h4>
        <div style={{fontFamily: 'monospace', fontSize: 22}}>
            {parseInt(props.avgSalary)
                ? parseInt(props.avgSalary).toLocaleString()+' $'
                : <CircularProgress />
            }
        </div>
    </div>
)
