import React from 'react'
import Section from './Section'

const ProgLangSection = (props) => {
    const {index, up, down} = props
    return (
        <Section
            index={index}
            up={() => up(index)}
            down={() => down(index)}>
            <h3>{'Online job profile, Programming language & framework'}</h3>
        </Section>
    )
}
export default ProgLangSection
