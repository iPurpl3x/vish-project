import React, {Component} from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import Section from './Section'
import * as d3 from 'd3'
import moment from 'moment'

export default class WorkStartSection extends Component {

    renderGraph() {

        const {workStart, perWorkStart} = this.props

        if (!workStart)
            return
        if (!perWorkStart)
            return

        const data = []
        let highestCount = 0
        let totalCount = 0
        for (let startTime in workStart) {
            if (!workStart[startTime])
                continue
            if (startTime == 'NA')
                continue
            data.push({
                startTime,
                count: workStart[startTime]
            })
            if (workStart[startTime] > highestCount) {
                highestCount = workStart[startTime]
            }
            totalCount += workStart[startTime]
        }

        data.sort((a, b) => {
            let aTimeStr = a.startTime
            let bTimeStr = b.startTime

            if (aTimeStr == 'Noon')
                aTimeStr = '12:00 PM'
            if (aTimeStr == 'Midnight')
                aTimeStr = '12:00 AM'

            if (bTimeStr == 'Noon')
                bTimeStr = '12:00 PM'
            if (bTimeStr == 'Midnight')
                bTimeStr = '12:00 AM'

            const aTime = moment(aTimeStr, ['hh:mm A']).valueOf()
            const bTime = moment(bTimeStr, ['hh:mm A']).valueOf()

            return aTime - bTime
        })


        const keys = [
            'NA',
            'Strongly agree',
            'Agree',
            'Somewhat agree',
            'Disagree',
            'Strongly disagree'
        ]
        const filteredChangeWorld = {}
        for (let startTime in workStart) {
            if (!perWorkStart[startTime]){
                filteredChangeWorld[startTime] = []
                continue
            }
            const _data = []
            for (let agreeing of keys) {
                if (!perWorkStart[startTime].change_world[agreeing])
                    continue
                const stack = 0
                if (_data.length)
                    stack = _data[_data.length-1].stack
                _data.push({
                    agreeing,
                    stack: perWorkStart[startTime].change_world[agreeing]+stack,
                    count: perWorkStart[startTime].change_world[agreeing]
                })
            }
            filteredChangeWorld[startTime] = _data
        }
        //console.log(filteredChangeWorld)

        const width = 600,
            height = 550,
            radius = Math.min(width-100, height-50) / 2,
            innerRadius = 0

        const pie = d3
            .pie()
            .sort(null)
            .value(1)

        const timeCount = d3
            .scalePow().exponent(0.2)
            .domain([0, highestCount])
            .range([0, radius])

        // const arc = d3
        //     .arc()
        //     .innerRadius(innerRadius)
        //     .outerRadius(function (d) {
        //         return timeCount(d.data.count)
        //     })

        const outlineArc = d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(radius)


        document
            .getElementById('work-time-radial')
            .innerHTML = ''
        const svg = d3
            .select('#work-time-radial')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

        const outerPath = svg
            .selectAll('.outlineArc')
            .data(pie(data))
            .enter()
            .append('g')
            .attr('class', 'arc')
            .append('path')
            .attr('fill', 'none')
            .attr('stroke', 'gray')
            .attr('class', 'outlineArc')
            .attr('d', outlineArc)


        const arcs = svg.selectAll('g.arc')
            .append('text')
                .text(d => d.data.startTime)
                .attr('font-size', 10)
                .attr('transform', d => {
                    var c = outlineArc.centroid(d),
                        x = c[0],
                        y = c[1],
                        // pythagorean theorem for hypotenuse
                        h = Math.sqrt(x*x + y*y);
                    return 'translate(' + (x/h * radius) +  ',' +
                       (y/h * radius) +  ')';
                })
                .attr('dy', '.35em')
                .attr('text-anchor', d => {
                    return (d.endAngle + d.startAngle) / 2 > Math.PI ? 'end' :'start'
                })
                .attr('style', 'text-shadow: 3px 3px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff')
                .on('mousemove', d => {
                    d3.select('#gender-tooltip')
                        .style('left', d3.event.pageX - 50 + 'px')
                        .style('top', d3.event.pageY - 100 + 'px')
                        .style('display', 'inline-block')
                        .style('color', 'black')
                        .html('<b>'+d.data.startTime+'</b>'
                            +'<br>Number of respondants: ' +d.data.count.toLocaleString()
                            +'<br>('
                            +((d.data.count/totalCount)*100).toFixed(2)
                            +' %)')

                })
                .on('mouseout', () => {
                    d3.select('#gender-tooltip').style('display', 'none');
                })


        const changeWorldKeys = [
            'Strongly disagree',
            'Disagree',
            'Somewhat agree',
            'Agree',
            'Strongly agree',
            'NA'
        ]

        // opacity scale
        const o = d3
            .scaleLinear()
            .domain([0, changeWorldKeys.length])
            .range([0.15, 1.5])

        for (let key of changeWorldKeys) {

            const arc = d3
                .arc()
                .innerRadius(d => {
                    const _data = filteredChangeWorld[d.data.startTime]
                    let count = 0
                    let stack = 0
                    for (let item of _data) {
                        if (item.agreeing == key) {
                            count = item.count
                            stack = item.stack
                        }
                    }
                    //return 0
                    const _timeCount = d3
                        .scaleLinear()
                        .domain([0, d.data.count])
                        .range([0, timeCount(d.data.count)])
                    return _timeCount(stack-count)
                })
                .outerRadius(d => {
                    //return timeCount(d.data.count)
                    const _data = filteredChangeWorld[d.data.startTime]
                    let count = 0
                    let stack = 0
                    for (let item of _data) {
                        if (item.agreeing == key) {
                            count = item.count
                            stack = item.stack
                        }
                    }
                    //return 0
                    //if(stack == d.data.count) console.log(true)
                    const _timeCount = d3
                        .scaleLinear()
                        .domain([0, d.data.count])
                        .range([0, timeCount(d.data.count)])
                    return _timeCount(stack)
                })
            const path = svg
                .selectAll('.solidArc-'+key.split(' ').join(''))
                .data(pie(data))
                .enter()
                .append('path')
                .attr('fill', '#20BF55')
                .attr('opacity', (d) => {
                    if (key == 'NA')
                        return 0
                    else {
                        return o(changeWorldKeys.indexOf(key))
                    }
                })
                .attr('class', '.solidArc-'+key.split(' ').join(''))
                .attr('stroke', 'gray')
                .attr('d', arc)
        }
    }


    render() {
        const {index, up, down} = this.props

        setImmediate(this.renderGraph.bind(this))

        return (<Section index={index} up={() => up(index)} down={() => down(index)}>
            <h3>{'Work starting time'}</h3>
            <div id='work-time-radial' className='flex-center'>
                <CircularProgress />
            </div>
        </Section>)
    }
}
