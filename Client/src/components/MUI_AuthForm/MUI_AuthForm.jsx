import * as React from 'react';

import './MUI_AuthForm.css'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Field, reduxForm } from 'redux-form'
import {renderTextField} from '../muiRenderToReduxForm'


const AuthReduxForm = reduxForm({ form: 'auth' })(props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field component={renderTextField} autoFocus fullWidth required
        type='text' id='username' name='username' label='Имя пользователя' />
      <Field component={renderTextField} fullWidth required
        type='password' id='password' name='password' label='Пароль' />
      <Button type='submit' size='large' variant='contained' fullWidth>
        {props.buttonSubmitText}
      </Button>
    </form>
  )
})

const AuthForm = props => {
  return (
    <Container component='main' maxWidth='xs'>
      <Box>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>{props.title}</Typography>
        <AuthReduxForm {...props} />
      </Box>
    </Container>
  );
}

export default AuthForm
