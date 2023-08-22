import React from 'react'
import { Button, Box, Stack } from '@mui/material'
import { NavLink } from 'react-router-dom'
import './groupTabs.css'

const subpages = [
    {path: '/admin/users', label: 'Пользователи'},    
    {path: '/admin/groups', label: 'Группы пользователей'},
    {path: '/admin/options', label: 'Настройки'},
]

const AdminTab = () => {

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

export default AdminTab
