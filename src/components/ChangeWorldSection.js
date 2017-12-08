import React from 'react'
import Section from './Section'

const ChangeWorldSection = (props) => {
    const {index, up, down} = props
    return (
        <Section
            index={index}
            up={() => up(index)}
            down={() => down(index)}>
            <h3>{'Change world'}</h3>
        </Section>
    )
}
export default ChangeWorldSection
