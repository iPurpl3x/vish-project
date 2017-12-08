import React from 'react'
import Section from './Section'

const WorkStartSection = (props) => {
    const {index, up, down} = props
    return (
        <Section
            index={index}
            up={() => up(index)}
            down={() => down(index)}>
            <h3>{'Work starting time'}</h3>
        </Section>
    )
}
export default WorkStartSection
