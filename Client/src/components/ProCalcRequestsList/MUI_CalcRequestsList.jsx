import React from 'react'
import { ScrollUp } from '../ScrollUp.jsx'

import { Button, IconButton, Box, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { MUI_MonthSelectorContainer } from '../MonthSelector/MUI_MonthSelectorContainer.jsx';
import RadioGroupSelector from '../RadioGroupSelector.jsx'

import MUI_LoadingIndicator from '../MUI_LoadingIndicator.jsx'
import MUI_ErrorMessage from '../MUI_ErrorMessage.jsx'
import MUI_ModalDialog from '../ModalDialog/MUI_ModalDialog.jsx'

import './MUI_CalcRequestsList.scss'
import CalcRequest from './CalcRequest/MUI_CalcRequest.jsx'
import CalcRequestContextMenu from './CalcRequest/MUI_CalcRequestContextMenu.jsx'
import { createMUIModalTitle } from '../../utils/others.js';

const MUI_CalcRequestsList = (props) => {

    const { calcRequests, totalRecordsCount, handleCalcRequest,
        error, loading, period, handleDownloadMore, modal, } = props

    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleMenu = (id, anchorEl) => {
        setAnchorEl(anchorEl)
    }

    const selectors = [
        { value: '0', label: 'все' },
        { value: '1', label: 'без вариантов' },
        { value: '2', label: 'в работе' }
    ]

    const [selector, setSelector] = React.useState("0")

    const selectedCalcRequests = calcRequests.filter(req =>
        (selector == '0') ||
        (selector == '1' && req.requestvariants.length == 0) ||
        (selector == '2' && req.requestvariants.reduce((orderSpec, v) => orderSpec + v.isOrderSpec, 0) > 0)
    )

    return (
        <>
            <MUI_ModalDialog
                id={modal.modalId}
                title={createMUIModalTitle('Заявка на расчет: ', modal.editCalcRequest?.code)}
                style={modal.style}
                fullScreen={false}
                fullWidth={true}
                actionButton={true} actionButtonText={modal.actionButtonText}
                children={modal.children}
                handleAction={modal.handleAction}
                parentHandleClose={modal.handleClose}
                useModalButton={modal.useModalButton}
            />
            <ScrollUp />
            <MUI_MonthSelectorContainer period={period} />
            <Box className='procalcrequestslist'>
                <Box className='procalcrequestslist__header'>
                    <Box>
                        <Box component={'p'}>Заявки на расчет</Box>
                        <RadioGroupSelector value={selector} handle={setSelector} name="calcrequests_selectors" choices={selectors} />
                    </Box>
                    <Box className='procalcrequestslist__controls'>
                        <Button color='warning' variant='contained' action_id={2} onClick={e => handleGroup(-1, 2)}>
                            <Box component={'span'} action_id={2}>Новая заявка</Box>
                        </Button>
                        <Box className='procalcrequestslist__search'>
                            <IconButton onClick={() => { }} sx={{ p: '5px' }} aria-label="search_pcr">
                                <SearchIcon />
                            </IconButton>
                            <TextField size='small' value={''} onChange={() => { }} />
                            <IconButton onClick={() => { }} type="button">
                                <CancelPresentationIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
                <Box className='procalcrequestslist__list'>
                    {selectedCalcRequests.map(req =>
                        <CalcRequest
                            key={req.id}
                            request={req}
                            handleMenu={handleMenu}
                            handleCalcRequest={handleCalcRequest}
                        />)}

                    <Box className='procalcrequestslist__footer'>
                        <span>Загружено заявок: <b>{calcRequests.length}</b> из <b>{totalRecordsCount}</b></span>
                        <span style={{ marginLeft: '20px' }}>(показано: <b>{selectedCalcRequests.length}</b>)</span>
                    </Box>
                    {
                        (totalRecordsCount > calcRequests.length) &&
                        <Box className='procalcrequestslist__downloadmore'>
                            <Button variant="contained" size='small' color='primary' onClick={handleDownloadMore}>
                                Загрузить еще ...
                            </Button>
                        </Box>
                    }
                </Box>
            </Box>

            <CalcRequestContextMenu anchorEl={anchorEl} handleClick={handleMenu} />

            {error && <MUI_ErrorMessage message={error} />}

            {loading && <MUI_LoadingIndicator title='Загрузка...' />}
        </>
    )
}

export default MUI_CalcRequestsList
