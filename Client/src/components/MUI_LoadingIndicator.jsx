import React from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

const MUI_LoadingIndicator = ({title}) => {
  return (
    <Box
    width="200px"
    height="70px"
    //bgcolor='red'
    position='fixed' top='50vh' left='calc(50vw - 50px)'
    display='flex' justifyContent='center' alignItems='center'
  >
    <Typography>
      {title}
    </Typography>
    <CircularProgress 
      sx={{
        position:'absolute', top:'20%', left:'40%'
      }}
    />
  </Box>
  )
}

export default MUI_LoadingIndicator
