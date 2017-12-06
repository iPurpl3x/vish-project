import DataUtils from './DataUtils'
import Emitter from 'es6-event-emitter'
import * as d3 from 'd3'

export default class DataLoader extends Emitter {
	constructor() {
		super()
		this._state = {}
		this.load()
	}

	load() {
		const data_schema_path = require('./survey_results_schema.csv')
		d3.csv(data_schema_path, (data_schema) => {
			this._state.data_schema = data_schema
			this.trigger('dataloader:loaded_schema')
		})

		const data_path = require('./survey_results_public.csv')
		d3.csv(data_path, (data) => {
			this._state.data = data
			this.trigger('dataloader:loaded_data')
		})
	}

	get sate() {
		return this._state
	}

	get countryCount() {
		this._state = DataUtils.getCountryCount(this._state)
		return this._state.countryCount
	}

	get perCountryData() {
		return this._state.perCountry
	}
}
