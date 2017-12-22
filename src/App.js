import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import FlatButton from 'material-ui/FlatButton'
import MainContent from './components/MainContent'

const theme = {
    ...lightBaseTheme,
    palette: {
        ...lightBaseTheme.palette,
        primary1Color: '#01BAEF',
    }
}

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

        return (<MuiThemeProvider muiTheme={getMuiTheme(theme)}>
            <div className='App'>
                <AppBar
                    showMenuIconButton={false}
                    title='Stack Overflow developer survey results visualisation'
                    iconElementRight={
                        <FlatButton
                            label='compare'
                            onClick={this.handleCompare}
                        />}
                    style={{
                        width: '100%',
                        marginBottom: 6
                    }}
                />
                <div style={{overflowX: 'scroll'}}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        width: 'fit-content',
                        margin: 'auto'
                    }}>
                        <MainContent compareId={1}/>
                        <div id='tooltip' style={{zIndex: 10}}></div>
                        {compare && <MainContent compareId={2}/>}
                    </div>
                </div>
            </div>
        </MuiThemeProvider>)
    }
}

export default App
