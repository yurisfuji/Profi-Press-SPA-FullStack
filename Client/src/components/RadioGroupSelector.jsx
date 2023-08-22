import React from 'react'
import { RadioGroup, FormControlLabel, Radio, FormControl } from '@mui/material'

const RadioGroupSelector = ({name, value, handle, choices}) => {
    return (
        <FormControl className='radioselector'>
            <RadioGroup row name={name}
                value={value}
                onChange={e => handle(e.target.value)}
            >
                {choices.map(el => {
                    return <FormControlLabel
                        key={el.value} sx={{ height: '20px', mr: 1 }}
                        value={el.value} control={<Radio size='small' />}
                        label={el.label}
                    />
                })}
            </RadioGroup>
        </FormControl>
    )
}

export default RadioGroupSelector