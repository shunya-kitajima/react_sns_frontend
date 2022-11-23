import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import { GoMail } from 'react-icons/go'
import { BsFillPeopleFill } from 'react-icons/bs'
import { ApiContext } from '../context/ApiContext'
import UserProfile from './Profile'
import ProfileManager from './ProfileManager'
import Request from './Request'
import InboxDM from './InboxDM'

const Main: React.FC = () => {
  const { profile, profiles, friendRequestList, allFriendRequestList, inbox } =
    useContext(ApiContext)
  const filteredProfiles = profiles.filter((prof) => prof.id !== profile.id)
  const profileList =
    filteredProfiles.length !== 0 &&
    filteredProfiles.map((prof) => (
      <UserProfile
        key={prof.id}
        profileData={prof}
        requestDataArr={allFriendRequestList.filter(
          (request) =>
            prof.userPro === request.askFrom || prof.userPro === request.askTo
        )}
      />
    ))
  const requestList = (
    <ul>
      {friendRequestList.map((req) => (
        <Request
          key={req.id}
          requestData={req}
          profileDataArr={profiles.filter(
            (prof) => req.askFrom === prof.userPro
          )}
        />
      ))}
    </ul>
  )

  const inboxList = (
    <ul>
      {inbox.map((dm) => (
        <InboxDM
          key={dm.id}
          profileDataArr={profiles.filter((prof) => dm.sender === prof.userPro)}
          dmData={dm}
        />
      ))}
    </ul>
  )

  return (
    <Grid container>
      <Grid item xs={4}>
        <div className="app-profiles">
          <div className="task-list">{profileList}</div>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className="app-details">
          <ProfileManager />
        </div>
        <h3 className="title-friendRequest">
          <BsFillPeopleFill className="badge" />
          Approval request list
        </h3>
        <div className="app-details">
          <div className="task-list">{profile.id !== null && requestList}</div>
        </div>
      </Grid>
      <Grid item xs={4}>
        <h3>
          <GoMail className="badge" />
          DM Inbox
        </h3>
        <div className="app-dms">
          <div className="task-list">{profile.id !== null && inboxList}</div>
        </div>
      </Grid>
    </Grid>
  )
}

export default Main
