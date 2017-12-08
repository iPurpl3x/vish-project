import React from 'react'
import Section from './Section'

const AvgSalSection = (props) => {
    const {index, up, down, avgSalary, perGender} = props
    return (
        <Section
            index={index}
            id={index+'_s'}
            up={() => up(index)}
            down={() => down(index)}>
            <h3>{'Average salary'}</h3>
            <div className='Section-body'>
                <div>Average salary : {parseInt(avgSalary) || '...'}</div>
            </div>
        </Section>
    )
}
export default AvgSalSection
