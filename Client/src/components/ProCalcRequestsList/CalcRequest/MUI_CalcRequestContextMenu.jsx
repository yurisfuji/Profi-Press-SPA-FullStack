import React from 'react'
import { Menu, MenuItem, ListItemIcon, Divider, Chip } from '@mui/material'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import PostAddIcon from '@mui/icons-material/PostAdd'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'

const CalcRequestContextMenu = ({anchorEl, handleClick}) => {
  
    //console.log(anchorEl?.attributes.req_id.value)

    const handleClose = () => {
        handleClick(null)
    }

    return (
        <Menu
            id="calcrequest-menu"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            <Divider textAlign='right'><Chip label="Работа с вариантами" /></Divider>
            <MenuItem
                onClick={handleClose}>
                <ListItemIcon><PostAddIcon fontSize="small" /></ListItemIcon>
                Добавить новый вариант
            </MenuItem>
            <MenuItem
                onClick={handleClose}>
                <ListItemIcon><FormatListNumberedIcon fontSize="small" /></ListItemIcon>
                Перенумерация вариантов
            </MenuItem>
            <Divider textAlign='right'><Chip label="Печатные формы" /></Divider>
            <MenuItem
                disabled
                onClick={handleClose}>
                <ListItemIcon><LocalPrintshopIcon fontSize="small" /></ListItemIcon>
                Сформировать бланк заявки
            </MenuItem>
        </Menu>
    )
}

export default CalcRequestContextMenu
