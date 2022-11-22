import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import { GoMail } from 'react-icons/go'
import { BsFillPeopleFill } from 'react-icons/bs'
import { ApiContext } from '../context/ApiContext'
import UserProfile from './Profile'

const Main: React.FC = () => {
  const { profile, profiles, friendRequestList, allFriendRequestList, inbox } =
    useContext(ApiContext)
  const filteredProfiles = profiles.filter((prof) => prof.id !== profile.id)
  const filteredRequests = allFriendRequestList.filter(
    (request) =>
      profile.userPro === request.askFrom || profile.userPro === request.askTo
  )
  const profileList =
    filteredProfiles.length !== 0 &&
    filteredProfiles.map((prof) => (
      <UserProfile
        key={prof.id}
        profileData={prof}
        requestDataArr={filteredRequests}
      />
    ))

  return (
    <Grid container>
      <Grid item xs={4}>
        <div className="app-profiles">{profileList}</div>
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
