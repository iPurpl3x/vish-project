import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CircularProgress from 'material-ui/CircularProgress'
import Section from './Section'
import ChartTitle from './ChartTitle'
import renderBubbles from '../renderBubbles'

export default class EduSection extends Component {

    static get contextTypes() {
        return {
            compareId: PropTypes.number
        }
    }

    render() {
        const {
            index,
            up,
            down,
            educationCounts,
            studyfieldCounts,
            data_schema
        } = this.props
        const {compareId} = this.context

        setImmediate(renderBubbles.bind(this, educationCounts, 'education-bubbles'+compareId))
        setImmediate(renderBubbles.bind(this, studyfieldCounts, 'studyfield-bubbles'+compareId))

        let educationQuestion = ''
        if (data_schema) {
            for (let q of data_schema) {
                if (q.Column == 'FormalEducation'){
                    educationQuestion = q.Question
                    break
                }
            }
        }

        let studyfieldQuestion = ''
        if (data_schema) {
            for (let q of data_schema) {
                if (q.Column == 'MajorUndergrad'){
                    studyfieldQuestion = q.Question
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
                        text='Eduction'
                        question={educationQuestion}
                        style={{width: '50%'}}
                    />
                    <ChartTitle
                        text='Study Field'
                        question={studyfieldQuestion}
                        style={{width: '50%'}}
                    />
                    <div id={'education-bubbles'+compareId} className='flex-center' style={{width: '50%'}}>
                        <CircularProgress />
                    </div>
                    <div id={'studyfield-bubbles'+compareId} className='flex-center' style={{width: '50%'}}>
                        <CircularProgress />
                    </div>
                </div>
            </Section>
        )
    }
}
