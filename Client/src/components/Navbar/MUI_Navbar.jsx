import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getCurrentUser } from '../../redux/slices/authSlice.js'
import LightThemeIcon from '@mui/icons-material/Brightness7.js'
import DarkThemeIcon from '@mui/icons-material/Brightness2.js'
import { Box, useMediaQuery, useTheme, IconButton, Button, Avatar } from '@mui/material'

import { openModal } from '../../redux/slices/modalSlice.js'
import {getInitials} from '../../utils/others.js'

import './MUI_Navbar.css'
import { changeMode, getMode } from '../../redux/slices/optionsSlice.js'

const MUI_Navbar = () => {
    const currentUser = useSelector(getCurrentUser)
    const mode = useSelector(getMode)
    const dispatch = useDispatch()

    // функция смены темы оформления
    const handleChangeTheme = () => {
        const nextMode = mode === 'dark' ? 'light' : 'dark'
        dispatch(changeMode(nextMode))
        window.localStorage.setItem('mui-mode', nextMode)
        document.documentElement.dataset.theme = nextMode
    }

    const handleLogout = () => {
        dispatch(openModal.logout)
    }

    // условие проверки, что ширина >= sm [используется для адаптивного скрытия элементов]
    const smUp_matches = useMediaQuery(useTheme().breakpoints.up('sm'))

    return (
        <Box className='navbar'>
            <Box className='navbar__body'>
                <NavLink to="http://www.profi-press.com" target='blank' href=''>
                    <Box className='navbar__logo'>
                        <img src='/img/pp-logo.png' alt='лого Профи-Пресс'/>
                        {smUp_matches && <Box component='span'>PROFI-PRESS</Box>}
                    </Box>
                </NavLink>
                <Box className='navbar__controls'>
                    <IconButton className='navbar__theme'
                        onClick={handleChangeTheme}
                        title={mode === 'dark' ? "Светлая тема" : "Темная тема"}>
                        {mode === 'dark' ? <LightThemeIcon /> : <DarkThemeIcon />}
                    </IconButton>
                    {currentUser == null ?
                        <NavLink to="auth/login" href="">
                            <Button variant='contained' color='warning' size='small'>Вход</Button>
                        </NavLink> :
                        <Box className='navbar__controls'>
                            {
                                currentUser.avatarUrl ?
                                    <Avatar className='navbar__avatar' alt={currentUser.username} src={currentUser.avatarUrl} /> :
                                    <Avatar className='navbar__avatar blankavatar'>{getInitials(currentUser.username)}</Avatar>
                            }
                            <Box className='navbar__controls__login'>
                                <Box component='span' lineHeight={1} mb={'5px'} color='white'>{currentUser.username}</Box>
                                <Button onClick={handleLogout} variant='contained' color='warning' size='small'>
                                    Выход
                                </Button>
                            </Box>
                        </Box>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default MUI_Navbar
