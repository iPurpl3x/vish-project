import React, {Component} from 'react'
import Paper from 'material-ui/Paper'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import './WorldMapContainer.css'
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import * as d3 from "d3"

/* TODO :
use https://github.com/markmarkoh/datamaps */

class WorldMapContainer extends Component {
    constructor() {
      super()
      this.state = {
        worlddata: [],
        bubbles: []
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
      console.log("Marker: ", this.state.bubbles[i])
    }

    setCountryBubbles(){
      if (!this.state.bubbles.length){
        if (Object.keys(this.props.countryCounters).length){
          let highestcount = 0
          let coordsarray = this.props.dataCoords.map(obj => {
          obj.coordinates = JSON.parse(obj.coordinates)
          if (this.props.countryCounters[obj.country]>highestcount){
            highestcount = this.props.countryCounters[obj.country]
          }
          return {...obj, count: this.props.countryCounters[obj.country]}
        })
        //console.log(coordsarray)
        //console.log(Object.keys(this.props.countryCounters))
        this.setState({
          bubbles: coordsarray,
          highestcount: highestcount,
        })
        console.log(coordsarray)
        }
      }
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
        const scale = d3
          .scaleSqrt()
          .domain([0, this.state.highestcount || 0])
          .range([3,200])

        const {perCountry} = this.props
        setImmediate(this.setCountryBubbles.bind(this))
        return (<div className='WorldMapContainer'>
            <Paper className='WorldMapContainer-paper'>
                <h3>World map</h3>

                {/* selectfield */}
                <SelectField
                    floatingLabelText="Countries"
                    value={this.state.value}
                    onChange={this._handleChange}
                >
                    {Object.keys(perCountry).map((country, i) =>(
                        <MenuItem key={i} value={i} primaryText={country}/>
                    ))}
                </SelectField>

                {/* worldmap */}
                <svg width={ 1280 } height={ 720 } viewBox="0 0 800 450">
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
                          fill="#E91E63"
                          stroke="#FFFFFF"
                          className="marker"
                          onClick={ () => this.handleMarkerClick(i) }
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
