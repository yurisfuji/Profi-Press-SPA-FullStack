import { Box } from "@mui/material";
import React, { createElement } from "react"
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

export const formatSequelizeDateTimeString = (sequelize_datetinestamp, smallTime = true) => {

    if(!sequelize_datetinestamp) 
        return null

    const [date, time] = sequelize_datetinestamp.split('T')
    const [y, m, d] = date.split('-')

    return createElement(
        'span',
        { className: 'chivo' },
        d + '.' + m + '.' + y.slice(2),
        createElement('span', { className: (smallTime?'small align-top':''), 
                                style: {marginLeft: '0.5rem'}}, time.substring(0, 8))
    );
}

export const createMUIModalTitle = (title, value) => {
  return React.createElement(
    'span',
    { style: { display: 'flex', alignItems: 'center' } },
    React.createElement('span', { style: { marginRight: 12 } }, title),
    React.createElement(Box, {
      component: 'span', px: 2, borderRadius: 2,
      sx: { bgcolor: '#000', color: '#fff ', fontSize: 20, fontFamily: '"Exo 2", sans-serif' }
    }, value),
  )
}

export const getInitials = (username) => username.split(" ").map(i => i[0]).join('').toUpperCase()

export const getSearchPeriodFromDate = (dateInPeriod = new Date()) => {
  const year = dateInPeriod.getFullYear().toString().slice(2)
  const month = dateInPeriod.getMonth() + 1
  return year + '-' + (month < 10 ? '0' : '') + month.toString()
}