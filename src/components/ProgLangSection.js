import React, {Component} from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import Section from './Section'
import * as d3 from 'd3'
import ReactBubbleChart from 'react-bubble-chart'
import ChartTitle from './ChartTitle'

export default class ProgLangSection extends Component {

    renderBubbles(_data, _id) {

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
                console.log(d.id, d.r)
                if (d.r < 30 || d.r < 38 && d.id.length > 7)
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

    render() {
        const {
            index,
            up,
            down,
            progLangCounts,
            onlineJobProfCounts,
            frameworkCounts,
            data_schema
        } = this.props

        setImmediate(this.renderBubbles.bind(this, progLangCounts, 'prog-lang-bubbles'))
        setImmediate(this.renderBubbles.bind(this, onlineJobProfCounts, 'online-job-prof-bubbles'))
        setImmediate(this.renderBubbles.bind(this, frameworkCounts, 'framework-bubbles'))

        let progLangQuestion = ''
        if (data_schema) {
            for (let q of data_schema) {
                if (q.Column == 'HaveWorkedLanguage'){
                    progLangQuestion = q.Question
                    break
                }
            }
        }

        let onlineJobProfQuestion = ''
        if (data_schema) {
            for (let q of data_schema) {
                if (q.Column == 'JobProfile'){
                    onlineJobProfQuestion = q.Question
                    break
                }
            }
        }

        let frameworkQuestion = ''
        if (data_schema) {
            for (let q of data_schema) {
                if (q.Column == 'HaveWorkedFramework'){
                    frameworkQuestion = q.Question
                    break
                }
            }
        }

        return (
            <Section
                index={index}
                up={() => up(index)}
                down={() => down(index)}>
                <div className='flex-center' style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <ChartTitle
                        text='Programming language'
                        question={progLangQuestion}
                        style={{width: '50%'}}
                    />
                    <ChartTitle
                        text='Framework'
                        question={frameworkQuestion}
                        style={{width: '50%'}}
                    />
                    <div id='prog-lang-bubbles' className='flex-center' style={{width: '50%'}}>
                        <CircularProgress />
                    </div>
                    <div id='framework-bubbles' className='flex-center' style={{width: '50%'}}>
                        <CircularProgress />
                    </div>

                    <ChartTitle
                        text='Online job profile'
                        question={onlineJobProfQuestion}
                        style={{width: '100%', marginTop: 25}}
                    />
                    <div id='online-job-prof-bubbles' className='flex-center' style={{width: '50%', flexGrow: 0}}>
                        <CircularProgress />
                    </div>
                </div>
            </Section>
        )
    }
}
