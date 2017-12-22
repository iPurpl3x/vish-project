import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FlatButton from 'material-ui/FlatButton'
import MainContent from './components/MainContent'

class App extends Component {

    state = {
        compare: false
    }

    handleCompare = () => {
        this.setState({
            compare: !this.state.compare
        })
    }

    render() {
        const {compare} = this.state

        return (<MuiThemeProvider>
            <div className='App'>
                <AppBar
                    showMenuIconButton={false}
                    title='Stack Overflow developer survey results visualisation'
                    iconElementRight={
                        <FlatButton
                            label='compare'
                            onClick={this.handleCompare}
                        />}
                />
                <div style={{display: 'flex'}}>
                    <MainContent compareId={1}/>
                    {compare && <MainContent compareId={2}/>}
                </div>
            </div>
        </MuiThemeProvider>)
    }
}

export default App
