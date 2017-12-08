import React, {Component} from 'react'
import Section from './Section'
import AvgSalSection from './AvgSalSection'
import ChangeWorldSection from './ChangeWorldSection'

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
        const {dataContainer={}, perGender, perWorkStart} = this.props

		return (<div className='Sections'>
            <AvgSalSection
                index={sections.indexOf('Average salary')}
                up={this._up}
                down={this._down}
                avgSalary={dataContainer.avg_salary}
                perGender={perGender}
            />
            <ChangeWorldSection
                index={sections.indexOf('Change world')}
                up={this._up}
                down={this._down}
            />
		</div>)
	}
}

export default Sections
