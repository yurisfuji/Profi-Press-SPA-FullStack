import React from 'react'
import { formatSequelizeDateTimeString } from '../../../utils/others.js'
import { Button, ButtonGroup, Stack, Box } from '@mui/material'
import Edit from '@mui/icons-material/Edit'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import './MUI_CalcRequest.css'

const CalcRequest = ({ request, handleMenu, handleCalcRequest }) => {

  return (
    <Box key={request.id} mb={1} className='pro-card pro-bg-color'>
      <Box className='calcrequest__header'>
        <Box className='calcrequest__header__code'>
          {request.code}
          <Box className='calcrequest__header__id'> 
            <small>[id: {request.id}]</small>
          </Box>
        </Box>
        <Box className='calcrequest__header__buttons'>
          <ButtonGroup variant="contained" size="small">
            <Button
              color="primary"
              startIcon={<Edit />}
              onClick={e => handleCalcRequest(request.id, 0)}>
              Edit
            </Button>
            <Button
              color="warning"
              onClick={e => handleMenu(request.id, e.currentTarget)}
              aria-controls={'calcrequest-menu'}
              aria-expanded={'true'}
              aria-label='calcRequest menu'
              aria-haspopup="menu">
                <MoreHorizIcon fontSize='small' />
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
      <Box className='calcrequest__name' title={request.name}>{request.name}</Box>
      {request.notes && 
        <Box className="pro-comment calcrequest__comment" title={request.notes}>
            <small><Box component="span">Комментарий: {request.notes}</Box></small>
        </Box>
      }

        <Box className='calcrequest__variants'>
          <Stack useFlexGap flexWrap="wrap" direction="row" spacing={1}>
            {
              request.requestvariants.map(v =>
                <Box key={v.id} className={v.isOrderSpec ? 'orderspec':''}>Вариант №{v.number}</Box>
            )}
          </Stack>
        </Box>

        <Box className='calcrequest__timestamps pro-comment'>
          <Box component="span" mr={2}>
            <Box component='span' >Созд.:</Box>
            <Box component="span"><Box component='mark'>{request.authorCreate}</Box></Box>
            <Box component="span">{formatSequelizeDateTimeString(request.createdAt, false)} </Box>
          </Box>
          <Box component="span">
              <Box component='span'>Изм.:</Box>
            <Box component="span"><Box component='mark'>{request.authorLastModif}</Box></Box>
            <Box component="span">{formatSequelizeDateTimeString(request.updatedAt, false)} </Box>
          </Box>
        </Box>
      </Box>
  )
}

export default CalcRequest