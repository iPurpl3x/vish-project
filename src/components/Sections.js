import React, {Component} from 'react'
import Section from './Section'
import AvgSalSection from './AvgSalSection'
import ChangeWorldSection from './ChangeWorldSection'
import WorkStartSection from './WorkStartSection'
import ProgLangSection from './ProgLangSection'
import EduSection from './EduSection'

class Sections extends Component {

	constructor() {
		super()
		const section_names = [
            'Average salary',
            'Change world',
            'Work starting time',
            'Education & study field',
            'Online job profile, Programming language & framework'
        ]
		this.state = {
			section_names
		}
	}

    _up = (index) => {
        if (index === 0) return
        const section_names = [...this.state.section_names]
    	const movingDown = section_names[index-1]
    	section_names[index-1] = section_names[index]
    	section_names[index] = movingDown
        this.setState({section_names})
    }

    _down = (index) => {
        const section_names = [...this.state.section_names]
        if (index === section_names.length-1) return
    	const movingUp = section_names[index+1]
    	section_names[index+1] = section_names[index]
    	section_names[index] = movingUp
        this.setState({section_names})
    }

	render() {
		const {section_names} = this.state
        const {dataContainer={}, perGender, perWorkStart} = this.props

        const sections = section_names.map((name, i) => {
            switch (name) {
                case 'Average salary':
                    return (
                        <AvgSalSection
                            key={i}
                            index={i}
                            up={this._up}
                            down={this._down}
                            avgSalary={dataContainer.avg_salary}
                            perGender={perGender}
                            genderCounts={dataContainer.gender}
                        />
                    )

                case 'Change world':
                    return (
                        <ChangeWorldSection
                            key={i}
                            index={i}
                            up={this._up}
                            down={this._down}
                            changeWorld={dataContainer.change_world}
                        />
                    )

                case 'Work starting time':
                    return (
                        <WorkStartSection
                            key={i}
                            index={i}
                            up={this._up}
                            down={this._down}
                            perWorkStart={perWorkStart}
                            workStart={dataContainer.work_start}
                        />
                    )
                case 'Education & study field':
                    return (
                        <EduSection
                            key={i}
                            index={i}
                            up={this._up}
                            down={this._down}
                        />
                    )
                case 'Online job profile, Programming language & framework':
                    return (
                        <ProgLangSection
                            key={i}
                            index={i}
                            up={this._up}
                            down={this._down}
                        />
                    )
            }
        })

		return (<div className='Sections'>
            {sections.map((Comp, i) => Comp)}
		</div>)
	}
}

export default Sections
