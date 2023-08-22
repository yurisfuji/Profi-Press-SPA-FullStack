import React from 'react'
import { Button, Box, Stack } from '@mui/material'
import { NavLink } from 'react-router-dom'
import './groupTabs.css'
import { useSelector } from 'react-redux'


const TechnoTab = () => {

    const period = (useSelector(state => state.pro.calcRequestSearchPeriod))

    const subpages = [
        {path: '/techno/calcrequests'+(period ? `?period=${period}` : ''), label: 'Заявки на расчет'},    
        {path: '/techno/operations', label: 'Справочник тех.операций'},
        {path: '/techno/options', label: 'Настройки'},
    ]

    return (
        <Box className='grouptab'>
            <Stack spacing={2}>
                {subpages.map((sp, i) =>  
                    <NavLink key={i} to={sp.path}>
                        <Button variant='contained' color="primary">
                            {sp.label}
                        </Button>
                    </NavLink>
                )}
            </Stack>
        </Box>
    )
}

export default TechnoTab
