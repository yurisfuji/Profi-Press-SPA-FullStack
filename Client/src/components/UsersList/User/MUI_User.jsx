import React from 'react';
import { Button, ButtonGroup, Box, Avatar, List, ListItem, ListItemText } from '@mui/material'
import RemoveCircle from '@mui/icons-material/RemoveCircle'
import Edit from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete';
import SVG from 'react-inlinesvg'
import {getInitials} from '../../../utils/others'
import './MUI_User.scss'


function MUI_User({ id, username, avatarUrl, isAdmin, isBlocked, groups, handleUser }) {

    return (
            <Box className='pro-card pro-bg-color user'>
            <Box className='user__header'>
            {
                    avatarUrl ?
                        <Avatar className='user__avatar' alt={username} src={avatarUrl} /> :
                        <Avatar className='user__avatar blankavatar'>{getInitials(username)}</Avatar>
            }
                <Box component='div' className='user__name'>
                    <Box component='p' className={isAdmin ? 'user__admin': ''}>{username}</Box>
                    <Box component='p'> {isAdmin ? 'Админ' : 'Пользователь'}</Box>
                    <Box component='p'><small>[id: {id}]</small></Box>
                </Box>
                {isBlocked && <RemoveCircle color={'error'} title='Пользователь заблокирован' className='user__blocked' />}
            </Box>
            <Box className='user__description'>
            {groups.length > 0 && <List dense={true} className='user__groups'>
                {groups.map(v => <ListItem key={v.id}>
                    <Box><SVG src={v.avatarUrl} title={v.name} /></Box>
                    <ListItemText primary={v.name}/>
                    </ListItem>)}
            </List>}
            </Box>
                <Box className='user__buttons'>
                        <ButtonGroup variant="contained" size="small">
                            <Button  color="primary" title='Редактировать'
                                onClick={e => handleUser(id, 0)}>
                                <Edit  fontSize='small'/>
                            </Button>
                            <Button  color="warning" title='Удалить'
                                onClick={e => handleUser(id, 1)}>
                                <DeleteIcon fontSize='small'/>
                            </Button>
                        </ButtonGroup>
                    </Box>
            </Box>  
    )
}

export default MUI_User;
