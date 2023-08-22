import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { getCurrentUser } from '../../redux/slices/authSlice'
import { clearAdminError, getAdminError, getUsers } from '../../redux/slices/adminSlice'
import { fetchUsers, addUser, removeUser, updateUser } from '../../redux/thunks/admin/usersThunks'
import { modalIds, openModal } from '../../redux/slices/modalSlice'

import MUI_UsersList from './MUI_UsersList'
import MUI_UserEdit from './User/MUI_UserEdit'

import { Navigate } from 'react-router-dom'
import { reset } from 'redux-form'

export const UsersListContainer = () => {

    const currentUser = useSelector(getCurrentUser)
    const adminError = useSelector(getAdminError)

    const dispatch = useDispatch()
    React.useEffect(() => {
        if (currentUser?.isAdmin)
            dispatch(fetchUsers())
    }, [currentUser])

    React.useEffect(() => {
        if (adminError){
            toast(adminError)
            dispatch(clearAdminError())
        }
    }, [adminError])

    const users = useSelector(getUsers)

    const [editUser, setEditUser] = React.useState(null)
    const [actionType, setActionType] = React.useState(-1)

    const [groupsId, setGroupsId] = React.useState([])
    React.useEffect(() => {
        setGroupsId(editUser?.groups.map(g => g.id) || [])
    }, [editUser])

    const createUserEditForm = () => React.createElement(
        MUI_UserEdit,{ key: editUser?.id, 
                        user: editUser, 
                        groupsId: groupsId,
                        setGroupsId: setGroupsId,
                        handleSubmit: handleSaveUser,
                        handleClose: handleClose
                    }
    )

    const handleUser = (userId, action) => {
        try {
            switch (action) {
                case 2: setEditUser({
                    id: -1,
                    username: "Новый пользователь",
                    password: "",
                    avatarUrl: "",
                    isAdmin: false,
                    isBlocked: false,
                    groups: []
                })
                    break
                default: setEditUser(users.filter(user => user.id == userId)[0])
            }
            setActionType(action)
            dispatch(openModal.user)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSaveUser = (sendUserData) => {
        dispatch((sendUserData.id < 0) ? 
                    addUser({...sendUserData, groups: sendUserData.groupsId}) : 
                    updateUser({...sendUserData, groups: sendUserData.groupsId}))
        dispatch(openModal.close)
    }

    const handleRemoveUser = () => {
        dispatch((removeUser(editUser.id)))
        dispatch(openModal.close)
    }

    const handleClose = () => {
        reset('user')
        setGroupsId(editUser?.groups.map(g => g.id) || [])
        dispatch(openModal.close)
    }

    let modal = {
        modalId: modalIds.user,
        editUser,
        style: ['success', 'error', 'warning'][actionType],
        actionButtonText: ['Сохранить', 'Удалить', 'Добавить'][actionType],
        children: [ [createUserEditForm(), null, createUserEditForm()][actionType] ],
        handleAction: [handleSaveUser, handleRemoveUser, handleSaveUser][actionType],
        handleClose: handleClose,
        useModalButton: [false, true, false][actionType]
    }

    if(!currentUser)
        return <Navigate to='/'/>
        
    return (
        <MUI_UsersList  users={users} modal={modal} error={adminError}
                        handleUser={handleUser} />
    )
}
