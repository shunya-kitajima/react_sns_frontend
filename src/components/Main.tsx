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
      <Grid item xs={4}>
        <div className="app-details"></div>
        <h3 className="title-friendRequest">
          <BsFillPeopleFill className="badge" />
          Approval request list
        </h3>
        <div className="app-details"></div>
      </Grid>
      <Grid item xs={4}>
        <h3>
          <GoMail className="badge" />
          DM Inbox
        </h3>
        <div className="app-dms"></div>
      </Grid>
    </Grid>
  )
}

export default Main
