import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar'
import './App.css'
import WorldMapContainer from './components/WorldMapContainer'
import Sections from './components/Sections'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as d3 from 'd3'

const data_schema_path = require('./data/survey_results_schema.csv')
d3.csv(data_schema_path, (data_schema) => {
	console.log("data_schema:", data_schema)
})

const data_path = require('./data/survey_results_public.csv')
d3.csv(data_path, (data) => {
	console.log("data:", data)
})

class App extends Component {
	render() {
		return (<MuiThemeProvider>
			<div className="App">
				<AppBar showMenuIconButton={false} title="Stack Overflow developer survey results visualisation"/>
				<WorldMapContainer/>
				<Sections/>
			</div>
		</MuiThemeProvider>)
	}
}

export default App
