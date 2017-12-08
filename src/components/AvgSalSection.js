import React from 'react'
import Section from './Section'

const AvgSalSection = (props) => {
    const {index, up, down, avgSalary, perGender} = props
    return (
        <Section
            index={index}
            up={up}
            down={down}>
            <h3>{'Average salary'}</h3>
            <div style={{
                display: 'flex'
            }}>
                <div>Average salary : {parseInt(avgSalary) || '...'}</div>
            </div>
        </Section>
    )
}
export default AvgSalSection
