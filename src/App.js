import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Toggle from 'material-ui/Toggle'
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

    handleCompare = (event, isInputChecked) => {
        this.setState({
            compare: isInputChecked
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
                        <div style={{
                            background: 'rgba(255,255,255,0.3)',
                            borderRadius: 3,
                            margin: '7px 0',
                            cursor: 'pointer',
                            padding: '5px 10px'
                        }}>
                            <Toggle
                                label='compare'
                                onToggle={this.handleCompare}
                                labelStyle={{color: 'white'}}
                                labelPosition='right'
                            />
                        </div>}
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
