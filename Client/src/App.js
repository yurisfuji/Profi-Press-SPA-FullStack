import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { LoginPage, RegisterPage, MainPage } from './pages/index.js'
import {
  AdminTab, TechnoTab, UnknownGroupTab,
  UsersListContainer, UserGroupsListContainer,
  ProCalcRequestsListContainer
} from './components/index.js'

import './scss/styles.scss'
import { darkTheme, lightTheme, toCSSVariables } from './themes.js'
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import { fetchAuthMe } from './redux/thunks/authThunks.js'
import LayoutContainer from './components/Layout/LayoutContainer.jsx'
import { getGroupTabs, getMode } from './redux/slices/optionsSlice.js'


// получить компонент требуемой вкладки по алиасу
const getTabByAlias = (alias) => {
  switch (alias) {
    case "techno": return <TechnoTab />
    case "admin": return <AdminTab />
    default: return <UnknownGroupTab />
  }
}

function App() {

  const theme = useSelector(getMode) === 'dark' ? darkTheme : lightTheme

  const cssVariables = toCSSVariables(theme);
  const root = document.querySelector(':root');
  Object.keys(cssVariables).forEach((key) => {
    root.style.setProperty(key, cssVariables[key]);
  });

  const userGroupTabs = useSelector(getGroupTabs)

  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {true && <CssBaseline />}
        <LayoutContainer>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/admin/users" element={<UsersListContainer />} />
            <Route path="/admin/groups" element={<UserGroupsListContainer />} />
            <Route path="/techno/calcrequests" element={<ProCalcRequestsListContainer />} />
            {userGroupTabs.map((alias, i) => <Route key={i} path={'/' + alias} element={getTabByAlias(alias)} />)}
          </Routes>
          <ToastContainer position="bottom-right" />
        </LayoutContainer>
      </ThemeProvider>
    </div>
  )
}

export default App;
