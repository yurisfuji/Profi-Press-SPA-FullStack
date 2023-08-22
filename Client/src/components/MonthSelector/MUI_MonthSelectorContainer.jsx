import React from 'react'
import { getSearchPeriodFromDate, withRouter } from '../../utils/others.js'
import { MUI_MonthSelector } from './MUI_MonthSelector.jsx'

export const MUI_MonthSelectorContainer = withRouter((props) => {

  const {period, router} = props
  if (!period) return null

  const [ yy, mm ] =  period.split('-')
  const [activeMonth, setActiveMonth] = React.useState(parseInt(mm))
  const [activeYear, setActiveYear] = React.useState(2000 + parseInt(yy))
  const [newPath, setNewPath] = React.useState('')


  const handleUpdate = (year, month) => {
    setNewPath(router.location.pathname+`?period=${getSearchPeriodFromDate(new Date(`${year}-${month}-01`))}`) 
  } 
  
  const handleChange = ({ year, month }) => {
    if (year != activeYear) {
      setActiveYear(year)
      handleUpdate(year, activeMonth)
    }
    if (month != activeMonth) {
      setActiveMonth(month)
      handleUpdate(activeYear, month)
    }
  }

  return (
    <MUI_MonthSelector  activeMonth = {activeMonth}
                        activeYear={activeYear}
                        handleChange={handleChange} 
                        newPath={newPath} />
  )
})
