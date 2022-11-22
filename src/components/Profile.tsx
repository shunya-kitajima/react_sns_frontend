import React, { useContext } from 'react'
import { ApiContext } from '../context/ApiContext'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Profile, FriendRequest } from '../types'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}))

export interface Props {
  profileData: Profile
  requestDataArr: FriendRequest[]
}

const UserProfile: React.FC<Props> = ({ profileData, requestDataArr }) => {
  const classes = useStyles()
  const { profile, createFriendRequest } = useContext(ApiContext)
  if (profile === undefined || createFriendRequest === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }

  const sendRequest = async (): Promise<void> => {
    const requestData = {
      askFrom: profileData.userPro,
      askTo: profile.userPro,
    }
    await createFriendRequest(requestData)
  }

  return (
    <Card style={{ position: 'relative', display: 'flex', marginBottom: 10 }}>
      {profileData.img !== '' ? (
        <CardMedia style={{ minWidth: 100 }} image={profileData.img} />
      ) : (
        <CardMedia
          style={{ minWidth: 100 }}
          image="http://127.0.0.1:8000/media/image/null.pnp"
        />
      )}
      <CardContent style={{ padding: 5 }}>
        <Typography variant="h6">{profileData.nickName}</Typography>
        <Typography>{profileData.created_at}</Typography>
        {requestDataArr.length === 0 && profileData.id !== '' ? (
          <Button
            size="small"
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={async () => await sendRequest()}
          >
            Request Friend
          </Button>
        ) : (
          <Button
            size="small"
            className={classes.button}
            variant="contained"
            color="primary"
            disabled
          >
            Request Friend
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default UserProfile
