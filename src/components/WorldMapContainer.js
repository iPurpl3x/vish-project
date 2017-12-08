import React, {Component} from 'react'
import Paper from 'material-ui/Paper'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import './WorldMapContainer.css'
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"

/* TODO :
use https://github.com/markmarkoh/datamaps */

class WorldMapContainer extends Component {
    constructor() {
      super()
      this.state = {
        worlddata: [],
        cities: [
          { name: "Tokyo",          coordinates: [139.6917,35.6895],  population: 37843000 },
          { name: "Jakarta",        coordinates: [106.8650,-6.1751],  population: 30539000 },
          { name: "Delhi",          coordinates: [77.1025,28.7041],   population: 24998000 },
        ],
      }

      this.handleCountryClick = this.handleCountryClick.bind(this)
      this.handleMarkerClick = this.handleMarkerClick.bind(this)
    }

    projection() {
    return geoMercator()
      .scale(100)
      .translate([ 800 / 2, 450 / 2 ])
    }

    handleCountryClick(countryIndex) {
      console.log("Clicked on country: ", this.state.worlddata[countryIndex])
    }

    handleMarkerClick(i) {
      console.log("Marker: ", this.state.cities[i])
    }

    componentDidMount() {
      fetch("./world-110m.json")
        .then(response => {
          if (response.status !== 200) {
            console.log(`There was a problem: ${response.status}`)
            return
          }
          response.json().then(worlddata => {
            this.setState({
              worlddata: feature(worlddata, worlddata.objects.countries).features,
            })
          })
        })
    }

    state = {
        value: 0
    }

    _handleChange = (event, index, value) => {
        const {handleChange, perCountry} = this.props
        this.setState({value})
        handleChange(Object.keys(perCountry)[value])
    }

    render() {
        const {perCountry} = this.props
        return (<div className='WorldMapContainer'>
            <Paper className='WorldMapContainer-paper'>
                <h3>World map</h3>
                <SelectField
                    floatingLabelText="Countries"
                    value={this.state.value}
                    onChange={this._handleChange}
                >
                    {Object.keys(perCountry).map((country, i) =>(
                        <MenuItem key={i} value={i} primaryText={country}/>
                    ))}
                </SelectField>
                <svg width={ 800 } height={ 450 } viewBox="0 0 800 450">
                  <g className="countries">
                    {
                      this.state.worlddata.map((d,i) => (
                        <path
                          key={ `path-${ i }` }
                          d={ geoPath().projection(this.projection())(d) }
                          className="country"
                          fill={ `rgba(38,50,56,${ 1 / this.state.worlddata.length * i})` }
                          stroke="#FFFFFF"
                          strokeWidth={ 0.5 }
                          onClick={ () => this.handleCountryClick(i) }
                        />
                      ))
                    }
                  </g>
                  <g className="markers">
                    {
                      this.state.cities.map((city, i) => (
                        <circle
                          key={ `marker-${i}` }
                          cx={ this.projection()(city.coordinates)[0] }
                          cy={ this.projection()(city.coordinates)[1] }
                          r={ city.population / 3000000 }
                          fill="#E91E63"
                          stroke="#FFFFFF"
                          className="marker"
                          onClick={ () => this.handleMarkerClick(i) }
                        />
                      ))
                    }
                  </g>
                </svg>

            </Paper>
        </div>)
    }
}

export default WorldMapContainer
