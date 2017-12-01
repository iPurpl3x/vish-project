import React, {Component} from 'react'
import './App.css'
import Sections from './components/Sections'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {
	render() {
		return (<MuiThemeProvider>
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">
						Stack Overflow developper survey results visualisation
					</h1>
				</header>
				<Sections/>
			</div>
		</MuiThemeProvider>)
	}
}

export default App
