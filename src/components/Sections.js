import React, {Component} from 'react'
import Section from './Section'
import * as d3 from 'd3'
let data = require('../data/survey_results_schema.csv')
data = d3.csv(data, (data) => {
  console.log("data:", data)
})

class Sections extends Component {

	constructor() {
		super()
		const sections = [
            'Average salary',
            'Change world',
            'Work starting time',
            'Education & study field',
            'Online job profile, Programming language & framework'
        ]
		this.state = {
			sections
		}


	}

    _up = (event) => {
        let index = parseInt(event.target.parentElement.parentElement.id)
        if (isNaN(index))
            index = parseInt(event.target.parentElement.parentElement.parentElement.id)
        if (index === 0) return
        const sections = [...this.state.sections]
    	const movingDown = sections[index-1]
    	sections[index-1] = sections[index]
    	sections[index] = movingDown
        this.setState({sections})
    }

    _down = (event) => {
        let index = parseInt(event.target.parentElement.parentElement.id)
        if (isNaN(index))
            index = parseInt(event.target.parentElement.parentElement.parentElement.id)
        const sections = [...this.state.sections]
        if (index === sections.length-1) return
    	const movingUp = sections[index+1]
    	sections[index+1] = sections[index]
    	sections[index] = movingUp
        this.setState({sections})
    }

	render() {
		const {children, index} = this.props
		const {sections} = this.state

		return (<div className='Sections'>
			{sections.map((title, i) => <Section
                key={i}
                index={i}
                up={this._up}
                down={this._down}>
                {title}
            </Section>)}
		</div>)
	}
}

export default Sections
