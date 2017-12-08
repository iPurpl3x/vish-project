import React, {Component} from 'react'
import Section from './Section'

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
		const {sections} = this.state
        const {dataContainer} = this.props
        if (dataContainer) {
            console.log(dataContainer.avg_salary)
            console.log(dataContainer.gender)
            console.log(dataContainer.work_start)
            console.log(dataContainer.change_world)
            console.log(dataContainer.education)
            console.log(dataContainer.study_field)
            console.log(dataContainer.online_job_profile)
            console.log(dataContainer.prog_lang)
            console.log(dataContainer.framework)
        }

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
