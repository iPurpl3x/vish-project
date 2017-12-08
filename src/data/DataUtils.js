import DataContainer from './DataContainer'

export default class DataUtils {
    static _add(counters, label) {
        if (typeof counters[label] !== 'number') {
            counters[label] = 0
        }
        counters[label]++
    }

    static _store(store, data, attr_label) {
        const values = data[attr_label].split('; ')
        for (let value of values) {
            if (!store[value]) {
                store[value] = []
            }
            store[value].push(data)
        }
    }

    static getCount(data, attr_label, store = undefined) {
        const counters = {}
        data.map(answers => {

            if (answers[attr_label]) {
                const values = answers[attr_label].split('; ')
                for (let value of values) {
                    DataUtils._add(counters, value)
                    if (store)
                        DataUtils._store(store, answers, attr_label)
                }
            } else {
                throw('Could not read attribute from answer')
            }
        })

        if (store) {
            for (let label in store) {
                store[label] = new DataContainer(store[label])
            }
        }

        return counters
    }

}
