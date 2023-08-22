import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import AuthReduxForm from '../components/MUI_AuthForm/MUI_AuthForm.jsx'
import { toast } from 'react-toastify'
import { getAuthError, getIsAuthenticated } from '../redux/slices/authSlice.js'
import { fetchUserData } from '../redux/thunks/authThunks.js'

export default () => {

  const authError = useSelector(getAuthError)
  const isAuthenticated = useSelector(getIsAuthenticated)
  const dispatch = useDispatch()
    
  useEffect(() => {
    if(authError && !isAuthenticated && authError!='Нет доступа')
      toast(authError)
    if(isAuthenticated)
    toast("Вы вошли в систему")  
  }, [authError, isAuthenticated])

  const handlerSubmit = async (params) => {
    try {
      const data = await dispatch(fetchUserData(params)).then(
        data => {
          if (data.payload && 'token' in data.payload)
          window.localStorage.setItem('token', data.payload.token)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  if(isAuthenticated)
    return <Navigate to="/"/>

  return (
    <AuthReduxForm
        title = "Авторизация"
        buttonSubmitText = 'Войти в систему'
        onSubmit = {handlerSubmit}
     />
  )
}

