import React, {Component} from 'react'
import Paper from 'material-ui/Paper'
import './WorldMapContainer.css'

/*
TODO :
use https://github.com/markmarkoh/datamaps
*/

class WorldMapContainer extends Component {
	render() {
		return (<div className='WorldMapContainer'>
            <Paper className='WorldMapContainer-paper'>
                <h3>World map</h3>
            </Paper>
		</div>)
	}
}

export default WorldMapContainer
