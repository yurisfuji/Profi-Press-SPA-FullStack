import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCalcRequests } from '../redux/thunks/proThunks.js'
import { nextPage, setCalcRequestSearchPeriod } from '../redux/slices/proSlice.js'
import { modalIds, openModal } from '../redux/slices/modalSlice.js'
import {MUI_CalcRequestEdit} from '../components/ProCalcRequestsList/CalcRequest/MUI_CalcRequestEdit.jsx'
import { getSearchPeriodFromDate } from '../utils/others.js'
import { reset } from 'redux-form'

const useCalcRequests = (query) => {

    const dispatch = useDispatch()
    const calcRequestSearchPeriod = useSelector(state => state.pro.calcRequestSearchPeriod)

    let period = getSearchPeriodFromDate()
    if(query) {
        const match_query = query.slice(1).match(/\bperiod=(\d{2})-(\d{1,2})\b/); 
        if(match_query && match_query.length == 3) {
            period = getSearchPeriodFromDate(new Date(`20${match_query[1]}-${match_query[2]}-01`))
        }
    }

    React.useEffect(() => {
            if(period != calcRequestSearchPeriod)
                dispatch(setCalcRequestSearchPeriod({period}))
    }, [period])

    const proError = useSelector(state => state.pro.proError)
    const proLoading = useSelector(state => state.pro.proLoading)

    const calcRequests = useSelector(state => state.pro.calcRequests) || []
    const pageNumber = useSelector(state => state.pro.pageNumber)
    const pageSize = useSelector(state => state.pro.pageSize)

    const calcRequestSearchText = useSelector(state => state.pro.calcRequestSearchText)
    const totalRecordsCount = useSelector(state => state.pro.totalRequestsCount)
   
    const [editCalcRequest, setEditCalcRequest] = React.useState(null)
    const [actionType, setActionType] = React.useState(-1)

    // download page with records (calcrequests) from server
    React.useEffect(() => {
        if (calcRequestSearchPeriod || calcRequestSearchText)
            dispatch(fetchCalcRequests({
                searchtext: calcRequestSearchText,
                period: calcRequestSearchPeriod,
                pageNumber: pageNumber,
                pageSize: pageSize
            }))
    }, [calcRequestSearchPeriod, calcRequestSearchText, pageNumber])

    // download more records (next page)
    const handleDownloadMore = () => dispatch(nextPage())

    const handleCalcRequest = (calcRequestId, action) => {
        try {
            switch (action) {
                case 2: setEditCalcRequest({
                    id: -1,
                    code : "Новая группа",
                    name: '',
                    notes: '',
                  })
                    break
                default: setEditCalcRequest(calcRequests.filter(req => req.id == calcRequestId)[0])
            }
            setActionType(action)
            dispatch(openModal.calcRequest)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSaveCalcRequest = () => {}
    const handleRemoveCalcRequest = () => {}
    const handleClose = () => {
        reset('calcrequest')
    }

    const createCalcRequestEditForm = () => React.createElement(
        MUI_CalcRequestEdit,{ 
            key: editCalcRequest?.id, 
            group: editCalcRequest,
            handleSubmit: handleSaveCalcRequest,
            handleClose: handleClose
        })

    let modal = {
        modalId: modalIds.calcRequest,
        editCalcRequest,
        style: ['success', 'error', 'warning'][actionType],
        actionButtonText: ['Сохранить', 'Удалить', 'Добавить'][actionType],
        children: [ [createCalcRequestEditForm(), null, createCalcRequestEditForm()][actionType] ],
        handleAction: [handleSaveCalcRequest, handleRemoveCalcRequest, handleSaveCalcRequest][actionType],
        handleClose: handleClose,
        useModalButton: [false, true, false][actionType]
    }

    return { 
        proError, proLoading, calcRequests, totalRecordsCount,
        editCalcRequest, setEditCalcRequest, 
        handleDownloadMore, handleCalcRequest, modal,
        calcRequestSearchPeriod 
    }
}

export default useCalcRequests