import utils from './DataUtils'

export default class DataContainer {
	constructor(data) {
		this._data = data
		this._gender = utils.getCount(data, 'Gender')
		this._change_world = utils.getCount(data, 'ChangeWorld')
		this._prog_lang = utils.getCount(data, 'HaveWorkedLanguage')
	}

	get gender() {
		return {
			...this._gender
		}
	}
	get change_world() {
		return {
			...this._change_world
		}
	}
	get prog_lang() {
		return {
			...this._prog_lang
		}
	}
}
