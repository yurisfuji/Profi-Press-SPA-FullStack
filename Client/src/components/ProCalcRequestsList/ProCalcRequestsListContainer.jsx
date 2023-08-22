import React, { useState } from 'react'
import { withRouter } from '../../utils/others.js'

import { useDispatch, useSelector } from 'react-redux';
import { setCalcRequestSearchPeriod, setcalcRequestSearchText } from '../../redux/slices/proSlice.js'
import { isRapidSearch } from '../../redux/slices/optionsSlice.js'
import MUI_CalcRequestsList from './MUI_CalcRequestsList.jsx';
import useCalcRequests from '../../hooks/CalcRequests.js'

export const ProCalcRequestsListContainer = React.memo(withRouter((props) => {  

    let searchQuery = props.router.location.search

    const {
        proError, // сообщение об ошибке при загрузке и работе с заявками на расчет
        proLoading, // флаг загрузки порции заявок на расчет с сервера
        totalRecordsCount, calcRequests, editCalcRequest, 
        handleDownloadMore, handleMenu, handleCalcRequest,
        modal, calcRequestSearchPeriod
    } = useCalcRequests(searchQuery)

    const dispatch = useDispatch()

    const rapidSearch = useSelector(isRapidSearch)

    const searchEngine = () => {
        if (searchText)
            dispatch(setcalcRequestSearchText(searchText))
        else
            handleClearSearch()
    }

    const handleEnter = (event) => {
        if (useSelector(isRapidSearch) || (event.keyCode === 13))
            searchEngine()
    }

    const handleClearSearch = () => {
        setSearchText("")
        dispatch(setcalcRequestSearchText(null))
    } 

    return (
        <>
            <MUI_CalcRequestsList   calcRequests = {calcRequests}
                                    totalRecordsCount = {totalRecordsCount} 
                                    error = {proError}
                                    loading = {proLoading}
                                    period = {calcRequestSearchPeriod}
                                    handleCalcRequest = {handleCalcRequest}
                                    handleDownloadMore = {handleDownloadMore}
                                    handleMenu = {handleMenu} 
                                    modal = {modal}
            />
        </>

    )
}))
