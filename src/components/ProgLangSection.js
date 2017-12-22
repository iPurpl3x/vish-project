import React, {Component} from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import Section from './Section'
import ReactBubbleChart from 'react-bubble-chart'
import ChartTitle from './ChartTitle'
import renderBubbles from '../renderBubbles'

export default class ProgLangSection extends Component {

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

        setImmediate(renderBubbles.bind(this, progLangCounts, 'prog-lang-bubbles'))
        setImmediate(renderBubbles.bind(this, onlineJobProfCounts, 'online-job-prof-bubbles'))
        setImmediate(renderBubbles.bind(this, frameworkCounts, 'framework-bubbles'))

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
