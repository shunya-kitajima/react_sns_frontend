import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Appbar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Badge from '@material-ui/core/Badge'
import { FiLogOut } from 'react-icons/fi'
import { withCookies } from 'react-cookie'

const useStyles = makeStyles((theme) => ({
  badge: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}))

const Navbar: React.FC = (props: any) => {
  const classes = useStyles()

  const logout = (): void => {
    props.cookies.remove('current-token')
    window.location.href = '/'
  }

  return (
    <Appbar position="static">
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          SNS App
        </Typography>
        <Badge
          className={classes.badge}
          badgeContent={3}
          color="secondary"
          overlap="rectangular"
        >
          <NotificationsIcon />
        </Badge>
        <button className="signOut" onClick={() => logout()}>
          <FiLogOut />
        </button>
      </Toolbar>
    </Appbar>
  )
}

export default withCookies(Navbar)
