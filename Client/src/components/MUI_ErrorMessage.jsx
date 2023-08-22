import React, { useState } from 'react'

import Alert from '@mui/material//Alert'
import AlertTitle from '@mui/material//AlertTitle'
import Box from '@mui/material/Box'
import { Collapse } from '@mui/material'

const MUI_ErrorMessage = ({ message }) => {

  const [open, setOpen] = useState(true)

  return (
    <Box
      position='fixed' top='50vh' left='20%' width='60%'
      display='flex' justifyContent='center' alignItems='center'
    >
      <Collapse in={open}>
        <Alert onClose={() => { setOpen(false) }} variant="filled" severity="error">
          <AlertTitle>Ошибка</AlertTitle>
          {message}
        </Alert>
      </Collapse>
    </Box>
  )
}

export default MUI_ErrorMessage
