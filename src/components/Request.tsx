import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { RiMailAddLine } from 'react-icons/ri'
import { IoIosSend, IoMdClose } from 'react-icons/io'
import Modal from 'react-modal'
import { ApiContext } from '../context/ApiContext'
import { FriendRequest, Profile } from '../types'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  text: {
    margin: theme.spacing(3),
  },
}))

export interface Props {
  requestData: FriendRequest
  profileDataArr: Profile[]
}

const Request: React.FC<Props> = ({ requestData, profileDataArr }) => {
  const classes = useStyles()
  Modal.setAppElement('#root')
  const { profile, approveFriendRequest, sendDM } = useContext(ApiContext)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [text, setText] = useState('')
  const customStyles = {
    content: {
      top: '50%',
      left: '42%',
      right: 'auto',
      bottom: 'auto',
    },
  }

  const approve = async (): Promise<void> => {
    const approvedRequestData = {
      ...requestData,
      approved: true,
    }
    await approveFriendRequest(requestData, approvedRequestData)
  }
  const send = async (): Promise<void> => {
    const sendData = {
      sender: profile.userPro,
      receiver: requestData.askFrom,
      content: text,
    }
    await sendDM(sendData)
  }

  return (
    <li className="list-item">
      <h4>{profileDataArr[0].nickName}</h4>
      {!requestData.approved ? (
        <Button
          size="small"
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={async () => await approve()}
        >
          approve
        </Button>
      ) : (
        <button className="mail" onClick={() => setModalIsOpen(true)}>
          <RiMailAddLine />
        </button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <Typography>Message</Typography>
        <TextField
          className={classes.text}
          type="text"
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <button className="btn-modal" onClick={async () => await send()}>
          <IoIosSend />
        </button>
        <button className="btn-modal" onClick={() => setModalIsOpen(false)}>
          <IoMdClose />
        </button>
      </Modal>
    </li>
  )
}

export default Request
