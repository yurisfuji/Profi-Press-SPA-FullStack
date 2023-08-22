import React, { useState } from 'react'
import { Button, IconButton, Box, TextField, Grid } from '@mui/material'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import MUI_ModalDialog from '../ModalDialog/MUI_ModalDialog.jsx'
import RadioGroupSelector from '../RadioGroupSelector.jsx'
import './MUI_UserGroupsList.css'
import MUI_Group from './UserGroup/MUI_Group.jsx'
import { createMUIModalTitle } from '../../utils/others.js'

export const MUI_UserGroupsList = (props) => {

    if(!props) return null
    
    const { groups, modal, handleGroup } = props

    const selectors = [
        { value: '0', label: 'все' },
        { value: '1', label: 'пустые' },
    ]

    const [selector, setSelector] = React.useState("0")
    const [searchText, setSearchText] = useState("")

    const selected_groups = groups.filter(group =>
        (selector == '0') ||
        (selector == '1' && group.users.length == 0)
    ).filter(group => group.name.includes(searchText))

    return (
        <>
            <MUI_ModalDialog
                id={modal.modalId}
                title={createMUIModalTitle('Группа: ', modal.editGroup?.name)}
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
            <Box className='usergroupslist'>
                <Box>
                    <Box component={'p'}>Группы пользователей</Box>
                    <RadioGroupSelector value={selector} handle={setSelector} name="groups_selectors" choices={selectors}/>
                </Box>
                <Box className='usergroupslist__controls'>
                    <Button color='warning' variant='contained' action_id={2} onClick={e => handleGroup(-1, 2)}>
                        <Box component={'span'} action_id={2}>Новая группа</Box>
                    </Button>
                    <Box className='usergroupslist__search'>
                        <TextField size='small' value={searchText} onChange={e => setSearchText(e.target.value)}/>
                        <IconButton onClick={e => setSearchText('')} type="button">
                            <CancelPresentationIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            <Grid container>
                {selected_groups.map(el => <MUI_Group key={el.id} {...el} 
                                                    handleGroup={handleGroup}  />)}
            </Grid>
        </>
    )
}

export default MUI_UserGroupsList

