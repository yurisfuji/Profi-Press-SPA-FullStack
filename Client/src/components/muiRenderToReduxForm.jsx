import React from 'react'
import {
    TextField, Checkbox,
    FormControl, FormControlLabel,
    InputLabel, ListItemText,
    MenuItem, OutlinedInput, Select
} from '@mui/material';

export const renderTextField = ({
    input, label,
    meta: { touched, error },
    ...custom
}) => (<TextField margin='normal' label={label} {...input} {...custom} />)

export const renderCheckboxField = ({ input, label }) => (
    <>
        <FormControlLabel
            control={<Checkbox checked={input.value ? true : false}
                onChange={input.onChange} />}
            label={label}
        />
    </>
)

export const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>
    }
}

export const renderSelectField = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
}) => (
    <FormControl error={touched && error}>
        <InputLabel htmlFor="groupsId -native-simple">{label}</InputLabel>
        <Select
            native
            {...input}
            {...custom}
            inputProps={{
                name: 'groupsId',
                id: 'groupsId-native-simple'
            }}
        >
            {children}
        </Select>
        {renderFromHelper({ touched, error })}
    </FormControl>
)

export const renderMultiSelectCheckField = ({ categoryList, selectedCategoryIds, setSelectedCategoryIds, input, label, meta: { touched, error }, ...custom }) => {

    const newItemLabels = categoryList.filter(g => selectedCategoryIds.indexOf(g.id) >= 0).map(g => g.name)
    const [itemLabels, setItemlabels] = React.useState([])
    if (newItemLabels.join(',') != itemLabels.join(','))
        setItemlabels(newItemLabels)

    const handle = ({ props }) => {
        if (itemLabels.indexOf(props.value) >= 0) {
            setItemlabels(itemLabels.filter(n => n != props.value))
            const arr = selectedCategoryIds.filter(id => id != parseInt(props.category_id))
            setSelectedCategoryIds(arr)
            input.onChange(arr)
        }
        else {
            setItemlabels([...itemLabels, props.value])
            const arr = [...selectedCategoryIds, parseInt(props.category_id)]
            setSelectedCategoryIds(arr)
            input.onChange(arr)
        }
    }

    return (
        <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel id="groups-multiple-checkbox-label">{label}</InputLabel>
            <Select
                labelId="groups-multiple-checkbox-label"
                id="groups-multiple-checkbox"
                multiple
                onChange={(e, value) => handle(value)}
                value={itemLabels}
                input={<OutlinedInput label={label} />}
                renderValue={(selected) => selected.join(', ')}
                children={categoryList.map((item) => (
                    <MenuItem key={item.id} category_id={item.id} value={item.name}>
                        <Checkbox checked={selectedCategoryIds.indexOf(item.id) > -1} />
                        <ListItemText primary={item.name} />
                    </MenuItem>
                ))}
            />
        </FormControl>
    )
}
