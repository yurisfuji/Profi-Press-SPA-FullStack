import React from 'react'

import Add from '@mui/icons-material/Add'
import Remove from '@mui/icons-material/Remove'
import { Box, Button } from '@mui/material'

import './MUI_MonthSelector.scss'
import { Navigate } from 'react-router-dom'

const monthNames = [
  "январь", "февраль", "март",
  "апрель", "май", "июнь",
  "июль", "август", "сентябрь",
  "октябрь", "ноябрь", "декабрь",
]

export const MUI_MonthSelector = React.memo(({ activeMonth, activeYear, handleChange, newPath }) => {

  const months = Array.from({ length: 12 },
    (_, index) => {
      const monthNumber = index + 1
      const isActiveMonth = monthNumber === activeMonth

      return (
        <Box className={'month' + (isActiveMonth ? ' active' : '')}
          key={monthNumber} title={monthNames[index]}
          onClick={() => handleChange({ month: monthNumber, year: activeYear })}
        >
          {monthNumber}
        </Box>
      )
    }
  )

  return (
    <>
      {newPath && <Navigate to={newPath} />}
      <Box className='monthselector pro-bg-color'>
        <Box className='monthsline'>
          <Box className='halfyear'>{months.slice(0, 6)}</Box>
          <Box className='yearblock'>
            <Button className='change-year-button' variant='contained' color='error' size='small'
              onClick={() => handleChange({ month: { activeMonth }, year: { activeYear } - 1 })}>
              <Remove fontSize="small" />
            </Button>
            <input type="text" className="year-input border-year" placeholder={activeYear}
              value={activeYear} onChange={(e, value) => handleChange({ month: { activeMonth }, year: { value } })}
            />
            <Button className='change-year-button' variant='contained' color='error' size='small'
              onClick={() => handleChange({ month: { activeMonth }, year: { activeYear } + 1 })}>
              <Add fontSize="small" />
            </Button>
          </Box>
          <Box className='halfyear'>{months.slice(6)}</Box>
        </Box>
      </Box>
    </>
  )
})
