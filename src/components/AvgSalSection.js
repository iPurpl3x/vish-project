import React, {Component} from 'react'
import Section from './Section'
import './AvgSalSection.css'
import * as d3 from 'd3'

export default class AvgSalSection extends Component {

    componentDidUpdate() {
        document.getElementById('gender-bar-chart').innerHTML = ''
        const {perGender} = this.props
        const data = []
        for (let gender of ['NA', 'Male', 'Female']) {
            data.push({
                gender,
                avg_salary: perGender[gender].avg_salary
            })
        }

        // Define colors
        // https://coolors.co/20bf55-0b4f6c-fffaff-01baef-757575
        const colors = {
            NA:'#757575',
            Male:'#01BAEF',
            Female:'#20BF55'
        }
        // set the dimensions and margins of the graph
        const margin = {
                top: 20,
                right: 20,
                bottom: 50,
                left: 50
            },
            width = 400 - margin.left - margin.right,
            height = 100 - margin.top - margin.bottom

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
        const svg = d3
            .select("#gender-bar-chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        // Scale the range of the data in the domains
        x.domain([ 0, d3.max(data, d => d.avg_salary) ])
        y.domain(data.map(d => d.gender))

        // append the rectangles for the bar chart
        svg
            .selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            //.attr("x", function(d) { return x(d.avg_salary); })
            .attr("width", d => x(d.avg_salary))
            .attr("y", d => y(d.gender))
            .attr("height", y.bandwidth())
            .attr('fill', d => colors[d.gender])

        // add the x Axis
        svg
            .append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-1.2em")
                .attr("dy", ".14em")
                .attr("transform", "rotate(-65)")

        // add the y Axis
        svg
            .append("g")
            .call(d3.axisLeft(y))
    }

    render() {
        const {index, up, down, avgSalary, perGender} = this.props

        if (!perGender) {
            return null
        }

        const chartData = []
        for (let gender in perGender) {
            chartData.push({label: gender, avg_salary: perGender[gender].avg_salary})
        }
        console.log(chartData)

        const chartSeries = [
            {
                field: 'avg_salary',
                name: 'Average salary'
            }
        ]

        const x = d => d.label
        const xScale = 'ordinal'
        const yTicks = [10, "%"]

        return (<Section index={index} id={index + '_s'} up={() => up(index)} down={() => down(index)}>
            <h3>{'Average salary'}</h3>
            <div className='Section-body'>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexGrow: '1'
                }}>
                    <h4 style={{marginTop: 0, marginBottom: 12}}>Global average</h4>
                    <div style={{fontFamily: 'monospace'}}>{parseInt(avgSalary) || '...'}</div>
                </div>
                <div id='gender-bar-chart'></div>
            </div>
        </Section>)
    }
}
