import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import DelIcon from 'material-ui/svg-icons/navigation/cancel'


const CountrySelectBar = (props) => (
    <div className='flex-center' style={{flexDirection: 'row'}}>
        <div style={{marginRight: '1em'}}>Selected country : </div>
        {props.list.length
            ? <SelectField
                value={props.value}
                onChange={props.handleChange}
              >
                {props.list.map((country, i) =>(
                    <MenuItem key={i} value={i} primaryText={country}/>
                ))}
            </SelectField>
            : <CircularProgress/>
        }
        <IconButton onClick={props.empty}>
            <DelIcon color={props.value?'black':'transparent'}/>
        </IconButton>
    </div>
)
export default CountrySelectBar
