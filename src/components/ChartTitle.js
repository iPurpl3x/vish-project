import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import QAIcon from 'material-ui/svg-icons/action/question-answer'

const ChartTitle = (props) => (
    <h3 className='flex-center' {...props} style={{...props.style, flexDirection: 'row'}} >
        <span>{props.text}</span>
        {props.question.length ? <span style={{ display: 'flex', marginTop: 6, marginLeft: 12, opacity: 0.6 }}>
            (<IconMenu
                iconButtonElement={<IconButton style={{padding: 0, width: 24, height: 24}}><QAIcon /></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'middle', vertical: 'top'}}
             >
                <div style={{padding: 10, maxWidth: 250, fontStyle: 'italic'}}>{props.question}</div>
            </IconMenu>)
        </span> : null}
    </h3>
)

export default ChartTitle
