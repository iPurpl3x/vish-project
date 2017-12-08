import React from 'react'
import Section from './Section'

const EduSection = (props) => {
    const {index, up, down} = props
    return (
        <Section
            index={index}
            up={() => up(index)}
            down={() => down(index)}>
            <h3>{'Education & study field'}</h3>
        </Section>
    )
}
export default EduSection
