import React, { useContext } from 'react'
import { ApiContext } from '../context/ApiContext'
import Grid from '@material-ui/core/Grid'
import { GoMail } from 'react-icons/go'
import { BsFillPeopleFill } from 'react-icons/bs'

const Main: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={4}>
        <div className="app-profiles"></div>
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}></Grid>
    </Grid>
  )
}

export default Main
