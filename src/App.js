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
        this.d.on('dataloader:loaded_data', this._useData)
        this.state = {
            currentCountry: undefined,
            per_gender_data: {},
            per_country_data: {},
            per_work_start_data: {},
            country_counters: {}
        }
    }

    _useData = () => {
        this.setState({
            per_gender_data:this.d.per_gender_data,
            per_country_data:this.d.per_country_data,
            per_work_start_data:this.d.per_work_start_data,
            country_counters:this.d.country_counters
        })

    }

    _changeCountry = (country) => {
        this.d.changeCountry(country)
        this.setState({currentCountry: country})
    }

	render() {
        const {
            currentCountry,
            per_country_data,
            per_gender_data,
            per_work_start_data,
            country_counters
        } = this.state

        let dataContainer = this.d.container
        if (currentCountry) {
            dataContainer = per_country_data[currentCountry]
        }

		return (<MuiThemeProvider>
			<div className="App">
                <AppBar
                    showMenuIconButton = {false}
                    title = "Stack Overflow developer survey results visualisation"
                />
				<WorldMapContainer
                    perCountry={per_country_data}
                    countryCounters={country_counters}
                    handleChange={this._changeCountry}/>
				<Sections
                    dataContainer={dataContainer}
                    perGender={per_gender_data}
                    perWorkStart={per_work_start_data}/>
			</div>
		</MuiThemeProvider>)
	}
}

export default App
