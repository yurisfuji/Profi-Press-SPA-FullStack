import React, { useEffect } from 'react'
import { getUserGroups } from '../../../redux/slices/adminSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm, initialize } from 'redux-form'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import DialogActions from '@mui/material/DialogActions';

import { openModal } from '../../../redux/slices/modalSlice';
import { getInitials } from '../../../utils/others'

import './MUI_UserEdit.css'
import { renderCheckboxField, renderMultiSelectCheckField, renderTextField } from '../../muiRenderToReduxForm';


const UserReduxForm = reduxForm({ form: 'user' })(props => {

    const [initials, setInitials] =React.useState(getInitials(props.user.username))
    const handleUsernameChanged = (value) => setInitials(getInitials(value))
    const [avatarUrl, setAvatarUrl] =React.useState(props.user.avatarUrl)
    const handleAvatarUrlChanged = (value) => setAvatarUrl(value)

    const userGroups = useSelector(getUserGroups) || []

    const dispatch = useDispatch()
    const handleCancel = () => {
        dispatch(openModal.close)  
        props.handleClose()   
    }

    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={renderTextField} autoFocus required
                onChange={(e, value) => handleUsernameChanged(value)} 
                type='text' id='username' name='username' label='Имя пользователя'/>
            <br />
            <Field component={renderTextField}
                type='password' id='password' name='password' label='Пароль' />
            <br />
            <Box display='flex' alignItems={'center'} justifyContent={'space-between'}>
                <Field component={renderTextField} fullWidth
                    type='text' id='avatarUrl' name='avatarUrl' label='Ссылка на аватар' 
                    onChange={(e, value) => handleAvatarUrlChanged(value)} 
                />
                {
                    avatarUrl ?
                        <Avatar className='user__avatar' src={avatarUrl} /> :
                        <Avatar className='user__avatar blankavatar'>{initials}</Avatar>
                }
            </Box>
            <Field component={renderCheckboxField} id='isAdmin' name='isAdmin' label='Админ' />
            <Field component={renderCheckboxField} id='isBlocked' name='isBlocked' label='Заблокирован' />
            <br/>
            <Field component={renderMultiSelectCheckField}
                categoryList={userGroups}
                selectedCategoryIds={props.user.groupsId}
                setSelectedCategoryIds={props.setGroupsId}
                id='groupsId' name='groupsId' label='Группы'
            />
            <DialogActions>
                <Button onClick={handleCancel}>Отмена</Button>
                <Button type='submit' autoFocus>
                        {props.user.id < 0 ? 'Добавить' : 'Сохранить'}
                </Button>
            </DialogActions>
        </form>
    )
})

const MUI_UserEdit = ({ user, groupsId, setGroupsId, handleSubmit, handleClose }) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initialize('user', {...user, groupsId}))
    }, [user])

    if (!user)
        return null

    return (
        <Container className='userform' maxWidth='xs'>
            <Box>
                <UserReduxForm  user={{...user, groupsId}}
                                setGroupsId={setGroupsId}
                                handleClose={handleClose}
                                onSubmit={handleSubmit} />
            </Box>
        </Container>
    )
}

export default MUI_UserEdit