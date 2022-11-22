import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { ReMailAddLine } from 'react-icons/ri'
import { IoIosSend, IoMdClose } from 'react-icons/io'
import Modal from 'react-modal'
import { ApiContext } from '../context/ApiContext'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  text: {
    margin: theme.spacing(3),
  },
}))

const Request: React.FC = () => {
  const classes = useStyles()

  return <div>Request</div>
}

export default Request
