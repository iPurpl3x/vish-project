import React, {Component} from 'react'
import Paper from 'material-ui/Paper'
import UpDownButtons from './UpDownButtons'
import './Section.css'

class Section extends Component {

	render() {
		const {children} = this.props

		return (<div className='Section'>
            <Paper className='Section-paper'>
                <UpDownButtons {...this.props}/>
                {children}
            </Paper>
        </div>)
	}
}

export default Section
