import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { getCurrentUser } from '../../redux/slices/authSlice'
import { clearAdminError, getAdminError, getUserGroups } from '../../redux/slices/adminSlice'
import { fetchUserGroups, addGroup, removeGroup, updateGroup } from '../../redux/thunks/admin/groupsThunks'
import { modalIds, openModal } from '../../redux/slices/modalSlice'

import MUI_UserGroupsList from './MUI_UserGroupsList'
import  MUI_GroupEdit  from './UserGroup/MUI_GroupEdit'

import { Navigate } from 'react-router-dom'
import { reset } from 'redux-form'

export const UserGroupsListContainer = () => {

    const currentUser = useSelector(getCurrentUser)
    const adminError = useSelector(getAdminError)

    const dispatch = useDispatch()
    React.useEffect(() => {
        if (currentUser?.isAdmin)
            dispatch(fetchUserGroups())
    }, [currentUser])

    React.useEffect(() => {
        if (adminError){
            toast(adminError)
            dispatch(clearAdminError())
        }
    }, [adminError])

    const groups = useSelector(getUserGroups)

    const [editGroup, setEditGroup] = React.useState(null)
    const [actionType, setActionType] = React.useState(-1)

    const createGroupEditForm = () => React.createElement(
        MUI_GroupEdit,{ 
            key: editGroup?.id, 
            group: editGroup,
            handleSubmit: handleSaveGroup,
            handleClose: handleClose
        })

    const handleGroup = (groupId, action) => {
        try {
            switch (action) {
                case 2: setEditGroup({
                    id: -1,
                    name : "Новая группа",
                    avatarUrl: "",
                    alias: "newgroup"
                  })
                    break
                default: setEditGroup(groups.filter(group => group.id == groupId)[0])
            }
            setActionType(action)
            dispatch(openModal.userGroup)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSaveGroup = (sendGroupData) => {
        dispatch((sendGroupData.id < 0) ? 
            addGroup(sendGroupData) : 
            updateGroup(sendGroupData))
        dispatch(openModal.close)
    }

    const handleRemoveGroup = () => {
        console.log(editGroup.id)
        dispatch((removeGroup(editGroup.id)))
        dispatch(openModal.close)
    }

    const handleClose = () => {
        reset('group')
    }

    let modal = {
        modalId: modalIds.userGroup,
        editGroup,
        style: ['success', 'error', 'warning'][actionType],
        actionButtonText: ['Сохранить', 'Удалить', 'Добавить'][actionType],
        children: [ [createGroupEditForm(), null, createGroupEditForm()][actionType] ],
        handleAction: [handleSaveGroup, handleRemoveGroup, handleSaveGroup][actionType],
        handleClose: handleClose,
        useModalButton: [false, true, false][actionType]
    }

    if(!currentUser)
        return <Navigate to='/'/>

    return (
        <MUI_UserGroupsList groups={groups} modal={modal} error={adminError}
            handleGroup={handleGroup} />
    )
}
