import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getAuthError, getIsAuthenticated } from '../redux/slices/authSlice.js'
import { fetchRegister } from '../redux/thunks/authThunks.js'
import AuthReduxForm from '../components/MUI_AuthForm/MUI_AuthForm'
import { toast } from 'react-toastify'

export default () => {

  const dispatch = useDispatch()

  const isAuthenticated = useSelector(getIsAuthenticated)
  const isAuthError = useSelector(getAuthError)

  useEffect(() => {
    if(isAuthError)
      toast(isAuthError)
    if(isAuthenticated)
    toast("Вы вошли в систему")  
  }, [isAuthError, isAuthenticated])

  const handleSubmit = async (params) => {
    try {
      const data = await dispatch(fetchRegister(params))
      if (data.payload && 'token' in data.payload)
        window.localStorage.setItem('token', data.payload.token)
    } catch (error) {
      console.log(error)
    }
  }

  if(isAuthenticated)
  return <Navigate to="/"/>

return (
  <AuthReduxForm
      title = "Регистрация"
      buttonSubmitText = 'Зарегистрироваться'
      onSubmit = {handleSubmit}
   />
)
}