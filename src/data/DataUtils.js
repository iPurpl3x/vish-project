export default class DataUtils {
	static getCountryCount(state) {

		const {data} = state

		const add = (countries, name) => {
			if (typeof countries[name] !== 'number') {
				countries[name] = 0
			}
			countries[name]++
		}

		const store = (store, data) => {
			if (!data['Country']) {
				throw('Could not access "Country" attribute of data')
			}
			const name = data['Country']
			if (!store[name]) {
				store[name] = []
			}
			store[name].push(data)
		}

		const countries = {}
		const perCountry = {}
		data.map(response => {
			if (response['Country']) {
				add(countries, response['Country'])
				store(perCountry, response)
			}
		})

		state.countryCount = countries
		state.perCountry = perCountry
		return state

	}
}
