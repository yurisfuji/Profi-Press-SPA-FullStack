import React from 'react'
import moment from 'moment'
import TextField from '@mui/material/TextField';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { checkCalcRequestCode, getDeliveryCities, getManagers } from '../../../redux/thunks/proThunks.js'
import { Autocomplete, FilledInput, FormControl, FormHelperText, InputAdornment, MenuItem, Select } from '@mui/material';

export const MUI_CalcRequestEdit = (props) => {

    const [code, setCode] = React.useState(props.calcRequest?.code)
    const [notes, setNotes] = React.useState(props.calcRequest?.notes || '')
    const [manager, setManager] = React.useState(props.calcRequest?.manager || '')
    const [errorCode, setErrorCode] = React.useState(false)
    const [errorCodeMessage, setErrorCodeMessage] = React.useState('')
    const [deliveryDate, setDeliveryDate] = React.useState(props.calcRequest?.deliveryDate ? 
        moment(props.calcRequest?.deliveryDate.toString().slice(0, 10), 'YYYY-MM-DD') : null)
    const [deliveryCity, setDeliveryCity] = React.useState(props.calcRequest?.deliveryCity)
  
    const [cities, setCities] = React.useState([])
    const [managers, setManagers] = React.useState([])

    React.useEffect(() => {
        //getDeliveryCities(setCities)
        //getManagers(setManagers)
    }, [])

    React.useEffect(() => {
        setCode(props.calcRequest?.code);
        setNotes(props.calcRequest?.notes || '');
        setManager(props.calcRequest?.manager || '');
        setDeliveryDate(props.calcRequest?.deliveryDate ? moment(props.calcRequest?.deliveryDate.toString().slice(0, 10), 'YYYY-MM-DD') : null);
        setDeliveryCity(props.calcRequest?.deliveryCity);
    }, [props.calcRequest]);

    const defaultCityProps = {
        options: cities,
        getOptionLabel: (city) => city,
    };

    const defaultManagerProps = {
        options: managers,
        getOptionLabel: (manager) => manager,
    };

    const ValidateCode = ({ requestCode, requestId }) => {
        if (requestCode.length != 10) {
            setErrorCodeMessage('Код должен иметь формат ГГ-ММ-НННН')
            return true
        }
        //else
            //checkCalcRequestCode({ code: requestCode, id: requestId }, setErrorCode, setErrorCodeMessage)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //props.handleSubmit({ username, password })
    }

    const ValidateAndSetCode = (newValue) => {
        setErrorCode(ValidateCode({ requestCode: newValue, requestId: props.calcRequest?.id }))
        setCode(newValue)
    }

    return (
        <Grid container component="form" onSubmit={handleSubmit} noValidate spacing={2}>
            <Grid item xs={7}>
                <Box sx={{ mt: 1, alignSelf: 'start' }}>
                    <Box m={1}>Код заявки</Box>
                    <FormControl sx={{ m: 1, mb: 2, maxHeight: '35px' }} variant="filled">
                        <FilledInput
                            id="pcrcode__input"
                            sx={{py: '5px', maxHeight: '35px'}}
                            endAdornment={<InputAdornment sx={{ my: 'auto' }} position="end">P</InputAdornment>}
                            aria-describedby="pcrcode__input-helper-text"
                            value={code}
                            error={errorCode}
                            onChange={e => ValidateAndSetCode(e.target.value)}
                            inputProps={{
                                'aria-label': 'Code',
                                sx: {py: '5px'}
                            }}
                        />
                        <FormHelperText error={errorCode} id="pcrcode__input-helper-text">{errorCodeMessage}</FormHelperText>

                    </FormControl>
                    <Box m={1}>Примечание</Box>
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                        <FilledInput
                            id="pcrnotes__input"
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            inputProps={{
                                'aria-label': 'Notes',
                            }}
                        />
                    </FormControl>
                    <Box m={1}>Менеджер</Box>
                    <Autocomplete
                        id="pcrmanager__input"
                        label=''
                        freeSolo
                        value={manager}
                        onChange={(event, newValue) => setManager(newValue)}
                        {...defaultManagerProps}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Box>
            </Grid>
            <Grid item xs={5}>
                <Box sx={{ mt: 1, alignSelf: 'start' }}>
                    <Box m={1}>Город доставки</Box>
                    <Autocomplete
                        id="pcrdeliverycity__input"
                        label=''
                        freeSolo
                        value={deliveryCity}
                        onChange={(event, newValue) => setDeliveryCity(newValue)}
                        {...defaultCityProps}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <Box m={1}>Дата доставки</Box>
                    <DateCalendar value={deliveryDate} onChange={(newValue) => setDeliveryDate(newValue)} />
                </Box>
            </Grid>
        </Grid>
    )
}
