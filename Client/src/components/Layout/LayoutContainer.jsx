import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

import { modalIds } from '../../redux/slices/modalSlice.js'
import { getCurrentUser, logoutUser } from '../../redux/slices/authSlice.js'
import { getUserGroups } from '../../redux/slices/adminSlice.js'
import { fetchUserGroups } from '../../redux/thunks/admin/groupsThunks.js'

import { withRouter } from '../../utils/others.js'

import MUI_Layout from './MUI_Layout.jsx'

const adminGroup = { 
  id: -1, 
  alias: "admin", 
  name: "Админ", 
  avatarUrl: '/img/avatars/admin.svg' 
}

const LayoutContainer = withRouter((props) => {

  const [pathname, ...pathparts] = props.router.location.pathname.slice(1).split('/')
  
  const currentUser = useSelector(getCurrentUser)
  const isAdmin = currentUser?.isAdmin || false
  
  const userGroups = useSelector(getUserGroups)

  const dispatch = useDispatch()
  React.useEffect(() => {
    if (isAdmin && userGroups.length == 0) {
      dispatch(fetchUserGroups())
    }
  }, [isAdmin])

  // groups - массив доступных пользователю ролей (групп пользователей)
  const groups = isAdmin ?
    [adminGroup].concat(...(userGroups || [])) :
    [...(currentUser?.groups || [])]

  // состояние для переключение активной группы
  let activeGroupIndex = groups.map(g => g.alias).indexOf(pathname)

  const navigateTo  = useNavigate()

  const handleLogout = () => {
    dispatch(logoutUser())
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('groupsLength')
    navigateTo('/')
  }

if(pathparts == '') {
  // если pathparts нет (запрошена именно страница группы) тогда подбираем нужную 
  const lastUserGroupsLength = window.localStorage.getItem('groupsLength')
  if (activeGroupIndex < 0 && 
    (!lastUserGroupsLength || lastUserGroupsLength == groups.length)) {
    if(groups.length > 0)
      return <Navigate to={"/"+groups[0].alias}/>
    else 
    // если у пользователя нет групп, перебрасываем на главную 
      if(!pathname.startsWith('auth') && pathname != '')
          return <Navigate to="/"/>     
  }
} 

  return (
      <MUI_Layout
          modalId = {modalIds.logout}
          handleModalAction = {handleLogout}
          groups = {groups}
          children = {props.children}
      />
  )
})

export default LayoutContainer