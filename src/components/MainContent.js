import React, {Component} from 'react'
import PropTypes from 'prop-types'
import WorldMapContainer from './WorldMapContainer'
import Sections from './Sections'
import DataLoader from '../data/DataLoader'

class MainContent extends Component {

    constructor() {
        super()
        this.d = new DataLoader()
        this.d.on('dataloader:loaded_data', this._useData)
        this.d.on('dataloader:loaded_coords', this._onCoords)
        this.state = {
            currentCountry: undefined,
            per_gender_data: {},
            per_country_data: {},
            per_work_start_data: {},
            country_counters: {},
            data_coords: []
        }
    }

    getChildContext() {
        return {compareId: this.props.compareId}
    }

    _onCoords = () => {
        this.setState({
            data_coords:this.d.data_coords,
        })
    }

    _useData = () => {
        this.setState({
            per_gender_data:this.d.per_gender_data,
            per_country_data:this.d.per_country_data,
            per_work_start_data:this.d.per_work_start_data,
            country_counters:this.d.country_counters,
            data_schema:this.d.data_schema
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
            country_counters,
            data_coords,
            data_schema
        } = this.state

        let dataContainer = this.d.container
        if (currentCountry) {
            dataContainer = per_country_data[currentCountry]
        }

		return (
			<div style={{zindex: 0}}>
				<WorldMapContainer
                    perCountry={per_country_data}
                    countryCounters={country_counters}
                    dataCoords={data_coords}
                    handleChange={this._changeCountry}/>
				<Sections
                    dataContainer={dataContainer}
                    perGender={per_gender_data}
                    perWorkStart={per_work_start_data}
                    data_schema={data_schema}/>
			</div>)
	}
}

MainContent.childContextTypes = {
    compareId: PropTypes.number.isRequired
}

export default MainContent
