import React, {Component} from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import Section from './Section'
import * as d3 from 'd3'
import ReactBubbleChart from 'react-bubble-chart'

export default class ProgLangSection extends Component {

    renderProgLang() {

        const {progLangCounts} = this.props

        // If yet no data
        if (!Object.keys(progLangCounts || {}).length) return

        const data = []
        let highestCount = 0
        let totalCount = 0
        for (let lang of Object.keys(progLangCounts)) {
            data.push({
                lang,
                count: progLangCounts[lang]
            })
            totalCount += progLangCounts[lang]
            if (progLangCounts[lang] > highestCount) {
                highestCount = progLangCounts[lang]
            }
        }

        const width = document.getElementById('prog-lang-bubbles').offsetWidth

        const colorCircles = d3.scaleOrdinal(['#0B4F6C', '#01BAEF', '#20BF55', '#757575'])

        document.getElementById('prog-lang-bubbles').innerHTML = ''
        const svg = d3.select('#prog-lang-bubbles')
            .append('svg')
            .attr('width', width)
            .attr('height', width)
            .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + width / 2 + ')')

        const scaleRadius = d3
            .scaleSqrt()
            .domain([0, highestCount])
            .range([2, 25])

    }

    render() {
        const {index, up, down, progLangCounts} = this.props

        setImmediate(this.renderProgLang.bind(this))

        return (
            <Section
                index={index}
                up={() => up(index)}
                down={() => down(index)}>
                <h3>{'Online job profile, Programming language & framework'}</h3>
                <div className='flex-center' style={{flexDirection: 'row'}}>
                    <div id='online-job-prof-bubbles' className='flex-center' style={{width: '33%'}}>
                        <CircularProgress />
                    </div>
                    <div id='prog-lang-bubbles' className='flex-center' style={{width: '33%'}}>
                        <CircularProgress />
                    </div>
                    <div id='framework-bubbles' className='flex-center' style={{width: '33%'}}>
                        <CircularProgress />
                    </div>
                </div>
            </Section>
        )
    }
}
