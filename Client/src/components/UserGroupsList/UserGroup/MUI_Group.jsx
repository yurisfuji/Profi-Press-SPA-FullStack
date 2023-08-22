import React from 'react';
import { Button, ButtonGroup, Box, Avatar, List, ListItem, ListItemText } from '@mui/material'
import Edit from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete';
import SVG from 'react-inlinesvg'
import './MUI_Group.scss'
import { getInitials } from '../../../utils/others';

function MUI_Group({ id, name, avatarUrl, alias, users, handleGroup }) {

    return (
        <Box className='pro-card pro-bg-color group'>
            <Box className='group__header'>
                {
                    avatarUrl ?
                        <SVG className='group__avatar' src={avatarUrl} width={32} alt={name} title={name} height="auto" /> :
                        <Avatar className='group__avatar blankavatar'>{getInitials(name)}</Avatar>
                }
                <Box component='div' className='group__name'>
                    <Box component='p'>{name}</Box>
                    <Box component='p'>{alias}</Box>
                    <Box component='p'><small>[id: {id}]</small></Box>
                </Box>
            </Box>
            <Box className='group__description'>
            {users.length > 0 && <List dense={true} className='group__users'>
                {users.map(v => <ListItem key={v.id}><ListItemText primary={v.username}/></ListItem>)}
            </List>}
            </Box>
            <Box className='group__buttons'>
                <ButtonGroup variant="contained" size="small">
                    <Button color="primary" title='Редактировать'
                        onClick={e => handleGroup(id, 0)}>
                        <Edit fontSize='small' />
                    </Button>
                    <Button color="warning" title='Удалить'
                        onClick={e => handleGroup(id, 1)}>
                        <DeleteIcon fontSize='small' />
                    </Button>
                </ButtonGroup>
            </Box>
        </Box>
    )
}

export default MUI_Group;
