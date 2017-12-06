import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar'
import './App.css'
import WorldMapContainer from './components/WorldMapContainer'
import Sections from './components/Sections'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DataLoader from './data/DataLoader'

class App extends Component {

	constructor() {
		super()
		this.d = new DataLoader()
		this.d.on('dataloader:loaded_data', this.storeCountryCount)
	}

	storeCountryCount = () => {
		const countries = this.d.country_counters
		console.log(countries)
		const perCountryData = this.d.per_country_data
		console.log(perCountryData)
		const gender = this.d.container.gender
		console.log(gender)
		const change_world = this.d.container.change_world
		console.log(change_world)
		const prog_lang = this.d.container.prog_lang
		console.log(prog_lang)
	}

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
