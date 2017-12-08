import utils from './DataUtils'

export default class DataContainer {
    constructor(data) {
        this._data = data

        // count for different attributes
        this._gender = utils.getCount(data, 'Gender')
        this._change_world = utils.getCount(data, 'ChangeWorld')
        this._work_start = utils.getCount(data, 'WorkStart')
        this._education = utils.getCount(data, 'FormalEducation')
        this._study_field = utils.getCount(data, 'MajorUndergrad')
        this._online_job_profile = utils.getCount(data, 'JobProfile')
        this._prog_lang = utils.getCount(data, 'HaveWorkedLanguage')
        this._framework = utils.getCount(data, 'HaveWorkedFramework')

        // average salary
        const salaryAvg = data => {
            let count = 0
            const sum = data.reduce((total, current) => {
                const salary = parseInt(current['Salary'])
                if (salary > 1) {
                    count++
                    return total + salary
                } else
                    return total
            }, 0)
            return sum/count
        }
        // Careful : avg salary can be NaN when all respondant of a country
        // wrote "NA" as answer for the Salary question
        this.avg_salary = salaryAvg(data)
    }

    get gender() {
        return {
            ...this._gender
        }
    }
    get work_start() {
        return {
            ...this._work_start
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
    get education() {
        return {
            ...this._education
        }
    }
    get study_field() {
        return {
            ...this._study_field
        }
    }
    get online_job_profile() {
        return {
            ...this._online_job_profile
        }
    }
    get framework() {
        return {
            ...this._framework
        }
    }
}
