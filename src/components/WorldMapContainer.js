import React, {Component} from 'react'
import Paper from 'material-ui/Paper'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import CircularProgress from 'material-ui/CircularProgress'
import './WorldMapContainer.css'
import {geoMercator, geoPath} from 'd3-geo'
import {feature} from 'topojson-client'
import * as d3 from 'd3'
import CountrySelectBar from './CountrySelectBar'


/* TODO :
use https://github.com/markmarkoh/datamaps */

class WorldMapContainer extends Component {
    constructor() {
        super()
        this.state = {
            worlddata: [],
            bubbles: []
        }
        this.handleCountryClick = this
            .handleCountryClick
            .bind(this)
        this.handleMarkerClick = this
            .handleMarkerClick
            .bind(this)
        this.handleMarkerMouseOver = this
            .handleMarkerMouseOver
            .bind(this)
        this.handleMarkerMouseOut = this
            .handleMarkerMouseOut
            .bind(this)
    }

    projection() {
        return geoMercator()
            .scale(100)
            .translate([
                800 / 2,
                450 / 2
            ])
    }

    handleCountryClick(countryIndex) {
        //console.log('Clicked on country: ', this.state.worlddata[countryIndex])
    }

    handleMarkerClick(i) {
        //console.log('Marker: ', this.state.bubbles[i])
        this._handleChange(null, this.state.bubbles[i].country, i)
    }

    handleMarkerMouseOver(i, event) {
        //console.log('MouseOver: ', this.state.bubbles[i])
        //console.log(event.screenY)
        d3
            .select('#gender-tooltip')
            .style('left', event.screenX - 50 + 'px')
            .style('top', event.screenY - 85 + 'px')
            .style('display', 'inline-block')
            .style('position', 'fixed')
            .style('color', '#000000')
            .html('<b>' + this.state.bubbles[i].country + '</b>' + '<br> count: ' + this.state.bubbles[i].count)
    }

    handleMarkerMouseOut(i) {
      d3.select('#gender-tooltip')
        .style('position', 'absolute')
        .style('display', 'none');
    }

    setCountryBubbles() {
        if (!this.state.bubbles.length) {
            if (Object.keys(this.props.countryCounters).length) {
                let highestcount = 0
                let coordsarray = this
                    .props
                    .dataCoords
                    .map(obj => {
                        obj.coordinates = JSON.parse(obj.coordinates)
                        if (this.props.countryCounters[obj.country] > highestcount) {
                            highestcount = this
                                .props
                                .countryCounters[obj.country]
                        }
                        return {
                            ...obj,
                            count: this
                                .props
                                .countryCounters[obj.country]
                        }
                    })
                //console.log(coordsarray)
                //console.log(Object.keys(this.props.countryCounters))
                coordsarray.sort((a, b) => {
                    return a.country - b.country
                })
                this.setState({bubbles: coordsarray, highestcount: highestcount})
                //console.log(coordsarray)
            }
        }
    }

    componentDidMount() {
        fetch('./world-110m.json').then(response => {
            if (response.status !== 200) {
                console.log(`There was a problem: ${response.status}`)
                return
            }
            response
                .json()
                .then(worlddata => {
                    this.setState({
                        worlddata: feature(worlddata, worlddata.objects.countries).features
                    })
                })
        })
    }

    state = {
        value: 0
    }

    _handleChange = (event, index, value) => {
        const {handleChange, perCountry} = this.props
        const countriesSort = Object
            .keys(perCountry)
            .sort()
        this.setState({value})
        handleChange(countriesSort[value])
    }

    _handleEmpty = () => {
        this.setState({value: undefined})
        const {handleChange} = this.props
        handleChange(undefined)
    }

    render() {
        const scale = d3
          .scaleSqrt()
          .domain([0, this.state.highestcount || 0])
          .range([3,200])

        const {perCountry} = this.props
        setImmediate(this.setCountryBubbles.bind(this))
        const countriesSort = Object.keys(perCountry).sort()
        let index = countriesSort.indexOf('I prefer not to say');
        countriesSort.splice(index, 1)

        return (<div className='WorldMapContainer'>
            <Paper className='WorldMapContainer-paper'>

                {/* selectfield */}
                <CountrySelectBar
                    value={this.state.value}
                    handleChange={this._handleChange}
                    list={countriesSort}
                    empty={this._handleEmpty}
                />

                {/* worldmap */}
                <svg width={ 700 } height={ 300 } viewBox='0 0 800 400'>
                    <g className='countries'>
                        {
                            this.state.worlddata.map((d,i) => (
                                <path
                                    key={ `path-${ i }` }
                                    d={ geoPath().projection(this.projection())(d) }
                                    className='country'
                                    //fill={ `rgba(38,50,56,${ 1 / this.state.worlddata.length * i})` }
                                    fill='#757575'
                                    stroke='#FFFFFF'
                                    strokeWidth={ 0.5 }
                                    onClick={ () => this.handleCountryClick(i) }
                        />
                      ))
                    }
                  </g>
                  <g className='markers'>
                    {
                      this.state.bubbles.map((bubble, i) => {
                        // console.log(bubble)
                        // console.log(this.projection()(bubble.coordinates)[0])
                        // console.log(this.projection()(bubble.coordinates)[1])
                        // console.log(bubble.count)
                        return (
                        <circle
                          key={ `marker-${i}` }
                          cx={ this.projection()(bubble.coordinates)[0] }
                          cy={ this.projection()(bubble.coordinates)[1] }
                          r={ scale(bubble.count / 100)}
                          fill='#01BAEF'
                          stroke='#000000'
                          className='marker'
                          onClick={ () => this.handleMarkerClick(i) }
                          onMouseOver={ (event) => this.handleMarkerMouseOver(i,event)}
                          onMouseOut={ (event) => this.handleMarkerMouseOut(i,event)}
                        />
                      )})
                    }
                  </g>
                </svg>

            </Paper>
        </div>)
    }
}

export default WorldMapContainer
