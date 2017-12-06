export default class DataUtils {
    static getCountryCount(data) {

        const add = (countries, name) => {
            if (typeof countries[name] === 'number') {
                countries[name]++
            } else {
                countries[name] = 1
            }
        }

        const countries = {}
        data.map(response => {
            if (response['Country']) {
                add(countries, response['Country'])
            }
        })

        return countries

    }
}
