import React from 'react'
import Navbar from '../Navbar/MUI_Navbar.jsx'
import { Box, Divider } from '@mui/material'
import MUI_SideBar from '../SideBar/MUI_SideBar.jsx'
import MUI_ModalDialog from '../ModalDialog/MUI_ModalDialog.jsx'
import './MUI_Layout.css'

const MUI_Layout = ({ modalId, handleModalAction, groups, children }) => {

  return (
    <>
      <MUI_ModalDialog
        id={modalId} title={null} style={[null, null]}
        fullScreen={false} fullWidth={true}
        actionButton={true} actionButtonText='Выйти'
        children='Вы действительно хотите выйти из системы?'
        handleAction={handleModalAction}
        parentHandleClose={null}
        useModalButton={true}
      />

      <Box component='header'>
        <Navbar />
        <Divider/>
      </Box>
      <Box className='mainSection'>
        {groups.length > 1 && <MUI_SideBar groups={groups} />}
        <Box component='div' className='workspace'>
          {children}
        </Box>
      </Box>
    </>
  )
}

export default MUI_Layout 
