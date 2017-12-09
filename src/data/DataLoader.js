import DataContainer from './DataContainer'
import utils from './DataUtils'
import Emitter from 'es6-event-emitter'
import * as d3 from 'd3'

export default class DataLoader extends Emitter {
    constructor() {
        super()
        this.load()
    }

    load() {
        const data_schema_path = require('./survey_results_schema.csv')
        d3.csv(data_schema_path, (data_schema) => {
            this._data_schema = data_schema
            this.trigger('dataloader:loaded_schema')
        })

        const data_path = require('./survey_results_public.csv')
        d3.csv(data_path, (data) => {
            this._data_container = new DataContainer(data)
            const per_country = {}
            this._country_counters = utils.getCount(data, 'Country', per_country)
            this._per_country = per_country
            const per_gender = {}
            utils.getCount(data, 'Gender', per_gender)
            this._per_gender = per_gender
            const per_work_start = {}
            utils.getCount(data, 'WorkStart', per_work_start)
            this._per_work_start = per_work_start
            this.trigger('dataloader:loaded_data')
        })

        const data_coords_path = require('./countrycoordinates.csv')
        d3.csv(data_coords_path, (data_coords) => {
            this._data_coords = data_coords
            this.trigger('dataloader:loaded_coords')
        })
    }

    changeCountry(country_name) {
        const data = this._per_country[country_name]._data
        const per_gender = {}
        utils.getCount(data, 'Gender', per_gender)
        this._per_gender = per_gender
        const per_work_start = {}
        utils.getCount(data, 'WorkStart', per_work_start)
        this._per_work_start = per_work_start
        this.trigger('dataloader:loaded_data')
    }

    get data_schema() {
        return this._data_schema
    }

    get container() {
        return this._data_container
    }

    get country_counters() {
        return {
            ...this._country_counters
        }
    }

    get per_country_data() {
        return {
            ...this._per_country
        }
    }

    get per_gender_data() {
        return {
            ...this._per_gender
        }
    }

    get per_work_start_data() {
        return {
            ...this._per_work_start
        }
    }

    get data_coords() {
        return [
            ...this._data_coords
        ]
    }
}
