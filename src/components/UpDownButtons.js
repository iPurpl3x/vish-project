import React, {Component} from 'react'
import IconButton from 'material-ui/IconButton'
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-drop-up'
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-drop-down'
import './UpDownButtons.css'

class UpDownButtons extends Component {

	render() {
		const {children, index, up, down} = this.props

		return (<div className='UpDownButtons'>
            <IconButton id={index+'_s'} tooltip='Move section up' onClick={up}>
                <ArrowUp/>
            </IconButton>
            <IconButton id={index+'_s'} tooltip='Move section down' onClick={down}>
                <ArrowDown/>
            </IconButton>
        </div>)
	}
}

export default UpDownButtons
