import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, IconButton, Typography, useColorScheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide';

import { openModal } from '../../redux/slices/modalSlice.js'
import { getMode } from '../../redux/slices/optionsSlice.js';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
});

const ColorDialogTitle = ({ id, children, bgColor, textColor, onClose }) => {

    return (
        <DialogTitle
            id={id}
            sx={{ m: 0, p: 2, bgcolor: bgColor, color:textColor }}
        >
            <Typography component={'span'} variant="h6" 
                sx={{fontFamily: '"Exo 2", sans-serif', fontWeight: 'normal'}}
            >
                {children}
            </Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: textColor,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

const MUI_ModalDialog = ({  id, actionButton, actionButtonText, 
                            title, style, fullScreen, fullWidth,
                            children, handleAction, parentHandleClose,
                            useModalButton 
                        }) => {

    const mode = useSelector(getMode)
    const [bgColor, textColor] =[   style+'.'+ (mode === 'dark' ? 'light':'dark'),
                                    mode == 'dark' ? 'black':'white'    ]

    const [open, setOpen] = useState(false)

    const openModalId = useSelector(state => state.modal.openModalId)

    React.useEffect(() => {
        setOpen(openModalId == id)
    }, [openModalId])

    const dispatch = useDispatch()

    const handleClose = () => {
        if(parentHandleClose)
            parentHandleClose();
        dispatch(openModal.close);
    }

    const handleActionAndClose = (event) => {
        handleAction(event)
        handleClose()
    }

    return (
        <Dialog
            id={id}
            open={open}
            TransitionComponent={Transition}
            fullWidth={fullWidth}
            fullScreen={fullScreen}
            keepMounted
            onClose={handleClose}
            aria-labelledby={id + "-dialog-title"}
            aria-describedby={id + "-dialog-description"}>

            {title && <ColorDialogTitle
                id={id + "-dialog-title"}
                bgColor={bgColor}
                textColor={textColor}
                onClose={handleClose}>{title}
            </ColorDialogTitle>}
            <DialogContent>
                <DialogContentText component={'div'} id={id + "-dialog-description"} sx={{ m: 0, px: 2 }}>
                    {children}
                </DialogContentText>
            </DialogContent>
            {useModalButton &&
                        <DialogActions>
                        <Button onClick={handleClose}>Отмена</Button>
                        {actionButton && 
                            <Button onClick={(e) => handleActionAndClose(event)} autoFocus>
                                {actionButtonText}
                            </Button>}
                    </DialogActions>
            }
        </Dialog>
    )
}

export default MUI_ModalDialog