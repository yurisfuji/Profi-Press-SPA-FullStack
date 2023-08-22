import React from 'react'
import './MUI_SideBar.css'
import SVG from 'react-inlinesvg'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { NavLink } from 'react-router-dom'
import Menu from '@mui/icons-material/Menu'

const MUI_SideBar = ({ groups }) => {

  const saveGroupLengthToStorage = () => {
    window.localStorage.setItem('groupsLength', groups.length)
  }

  // условие проверки, что ширина >= sm [используется для адаптивного скрытия элементов]
  const smUp_matches = useMediaQuery(useTheme().breakpoints.up('sm'))
  const [smallSidebar, setSmallSidebar] = React.useState()

  React.useEffect(() => {
  
    setSmallSidebar(!smUp_matches)
  }, [smUp_matches])

  const handleToogleSideBarWidth = () => {
    if(smUp_matches)
      setSmallSidebar(!smallSidebar)
  }

  return (
    <Box className={'sidebar '+ (smallSidebar ? 'smallSidebar' : '')}>
      <Box className='sidebar__banner'>
        <Menu onClick={handleToogleSideBarWidth} fontSize='24'/>
        <span>Выбор роли</span> 
      </Box>
      <Box className='sidebar__groupslist'>
        {groups.map((v, i) =>
          <NavLink key={v.id} to={'/' + v.alias}
            onClick={saveGroupLengthToStorage}>
            <Box className='userGroups__menu__item'>
              <Box><SVG src={v.avatarUrl} /></Box>
              <Box component={'span'}>{v.name}</Box>
            </Box>
          </NavLink>
        )}
      </Box>
    </Box>
  )
}

export default MUI_SideBar