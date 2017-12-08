import React, {Component} from 'react'
import Paper from 'material-ui/Paper'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import './WorldMapContainer.css'

/* TODO :
use https://github.com/markmarkoh/datamaps */

class WorldMapContainer extends Component {

    state = {
        value: 0
    }

    _handleChange = (event, index, value) => {
        const {handleChange, per_country} = this.props
        this.setState({value})
        handleChange(Object.keys(per_country)[value])
    }

    render() {
        const {per_country} = this.props
        return (<div className='WorldMapContainer'>
            <Paper className='WorldMapContainer-paper'>
                <h3>World map</h3>
                <SelectField
                    floatingLabelText="Countries"
                    value={this.state.value}
                    onChange={this._handleChange}
                >
                    {Object.keys(per_country).map((country, i) =>(
                        <MenuItem key={i} value={i} primaryText={country}/>
                    ))}
                </SelectField>
            </Paper>
        </div>)
    }
}

export default WorldMapContainer
