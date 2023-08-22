import React, { useState } from 'react'
import { Button, IconButton, Box, TextField, Grid } from '@mui/material'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import MUI_ModalDialog from '../ModalDialog/MUI_ModalDialog.jsx'
import RadioGroupSelector from '../RadioGroupSelector.jsx'
import './MUI_UsersList.css'
import MUI_User from './User/MUI_User.jsx'
import { createMUIModalTitle } from '../../utils/others.js'

export const MUI_UsersList = (props) => {

    if(!props) return null
    
    const { users, modal, handleUser } = props 

    const selectors = [
        { value: '0', label: 'все' },
        { value: '1', label: 'без групп' },
        { value: '2', label: 'в бане' }
    ]

    const [selector, setSelector] = React.useState("0")
    const [searchText, setSearchText] = useState("")

    const selected_users = users.filter(user =>
        (selector == '0') ||
        (selector == '1' && user.groups.length == 0) ||
        (selector == '2' && user.isBlocked)

    ).filter(user => user.username.includes(searchText))

    return (
        <>
            <MUI_ModalDialog
                id={modal.modalId}
                title={createMUIModalTitle('Пользователь: ', modal.editUser?.username)}
                style={modal.style}
                fullScreen={false}
                fullWidth={true}
                actionButton={true} actionButtonText={modal.actionButtonText}
                event={null}
                children={modal.children}
                handleAction={modal.handleAction}
                parentHandleClose={modal.handleClose}
                useModalButton={modal.useModalButton}
            />
            <Box className='userslist'>
                <Box>
                    <Box component={'p'}>Пользователи</Box>
                    <RadioGroupSelector value={selector} handle={setSelector} name="users_selectors" choices={selectors}/>
                </Box>
                <Box className='userslist__controls'>
                    <Button color='warning' variant='contained' action_id={2} onClick={e => handleUser(-1, 2)}>
                        <Box component={'span'} action_id={2}>Новый пользователь</Box>
                    </Button>
                    <Box className='userslist__search'>
                        <TextField size='small' value={searchText} onChange={e => setSearchText(e.target.value)}/>
                        <IconButton onClick={e => setSearchText('')} type="button">
                            <CancelPresentationIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            <Grid container>
                {selected_users.map(el => <MUI_User key={el.id} {...el} 
                                                    handleUser={handleUser}  />)}
            </Grid>
        </>
    )
}

export default MUI_UsersList

