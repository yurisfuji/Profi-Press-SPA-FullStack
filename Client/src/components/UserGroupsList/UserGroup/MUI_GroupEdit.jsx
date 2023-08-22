import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Field, reduxForm, initialize } from 'redux-form'
import SVG from 'react-inlinesvg'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import DialogActions from '@mui/material/DialogActions';

import { openModal } from '../../../redux/slices/modalSlice';

import './MUI_GroupEdit.css'
import { renderTextField } from '../../muiRenderToReduxForm';
import { getInitials } from '../../../utils/others';

const GroupReduxForm = reduxForm({ form: 'group' })(props => {

    const [initials, setInitials] =React.useState(getInitials(props.group.name))
    const handleNameChanged = (value) => setInitials(getInitials(value))
    const [avatarUrl, setAvatarUrl] = React.useState(props.group.avatarUrl)
    const handleAvatarUrlChanged = (value) => setAvatarUrl(value)

    const dispatch = useDispatch()
    const handleCancel = () => {
        dispatch(openModal.close)  
        props.handleClose()   
    }

    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={renderTextField} autoFocus required
                type='text' id='name' name='name' label='Название группы' 
                onChange={(e, value) => handleNameChanged(value)} />
            <br />
            <Field component={renderTextField}
                type='text' id='alias' name='alias' label='Псевдоним' />
            <br />
            <Box display='flex' alignItems={'center'} justifyContent={'space-between'}>
                <Field component={renderTextField} fullWidth
                    type='text' id='avatarUrl' name='avatarUrl' label='Ссылка на аватар'
                    onChange={(e, value) => handleAvatarUrlChanged(value)}
                />
                {avatarUrl &&
                    avatarUrl.endsWith('svg') ? 
                        <SVG className='user__avatar' src={avatarUrl} width={32} alt={name} title={name} height="auto" /> : 
                        <Avatar className='user__avatar' src={avatarUrl} >{initials}</Avatar>
                }
            </Box>
            <DialogActions>
                <Button onClick={handleCancel}>Отмена</Button>
                <Button type='submit' autoFocus>
                    {props.group.id < 0 ? 'Добавить' : 'Сохранить'}
                </Button>
            </DialogActions>
        </form>
    )
})

const MUI_GroupEdit = ({ group, handleSubmit, handleClose }) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initialize('group', group))
    }, [group])

    if (!group)
        return null

    return (
        <Container className='groupform' maxWidth='xs'>
            <Box>
                <GroupReduxForm group={group}
                                handleClose={handleClose}
                                onSubmit={handleSubmit} />
            </Box>
        </Container>
    )
}

export default MUI_GroupEdit