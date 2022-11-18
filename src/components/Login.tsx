import React, { useReducer, ChangeEvent, FormEvent } from 'react'
import { withCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { CircularProgress } from '@material-ui/core'
import {
  START_FETCH,
  FETCH_SUCCESS,
  ERROR_CATCHED,
  INPUT_EDIT,
  TOGGLE_MODE,
} from './actionTypes'
import { InitialState, Action } from '../types'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  span: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'teal',
  },
  spanError: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'fuchsia',
    marginTop: 10,
  },
}))

const initialState: InitialState = {
  isLoading: false,
  isLoginView: true,
  error: '',
  credentialsReg: {
    email: '',
    password: '',
  },
  credentialsLog: {
    username: '',
    password: '',
  },
}

const loginReducer = (state: InitialState, action: Action): InitialState => {
  switch (action.type) {
    case START_FETCH: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        isLoginView: false,
      }
    }
    case ERROR_CATCHED: {
      return {
        ...state,
        error: 'email or Password is not correct',
        isLoading: false,
      }
    }
    case INPUT_EDIT: {
      return {
        ...state,
        [action.inputName]: action.payload,
        error: '',
      }
    }
    case TOGGLE_MODE: {
      return {
        ...state,
        isLoginView: !state.isLoginView,
      }
    }
    default: {
      return state
    }
  }
}

const Login: React.FC = (props: any) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(loginReducer, initialState)

  const inputChangedReg = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    const cred = state.credentialsReg
    cred[e.target.name] = e.target.value
    dispatch({
      type: INPUT_EDIT,
      inputName: 'state.credentialsReg',
      payload: cred,
    })
  }

  const inputChangedLog = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    const cred = state.credentialsLog
    cred[e.target.name] = e.target.value
    dispatch({
      type: INPUT_EDIT,
      inputName: 'state.credentialsLog',
      payload: cred,
    })
  }

  const login = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (state.isLoginView) {
      try {
        dispatch({
          type: START_FETCH,
          inputName: 'state.isLoginView',
          payload: {},
        })
        const res = await axios.post(
          'http://127.0.0.1:8000/authen/',
          state.credentialsLog,
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )
        props.cookies.set('current-token', res.data.token)
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        res.data.token ? navigate('/profile') : navigate('/')
        dispatch({
          type: FETCH_SUCCESS,
          inputName: 'state.isLoading',
          payload: {},
        })
      } catch (e: any) {
        dispatch({
          type: ERROR_CATCHED,
          inputName: 'state.isLoading',
          payload: {},
        })
      }
    } else {
      try {
        dispatch({
          type: START_FETCH,
          inputName: 'state.isLoginView',
          payload: {},
        })
        const res = await axios.post(
          'http://127.0.0.1:8000/api/user/create',
          state.credentialsReg,
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )
        dispatch({
          type: FETCH_SUCCESS,
          inputName: 'state.isLoading',
          payload: {},
        })
        dispatch({
          type: TOGGLE_MODE,
          inputName: 'state.isLoginView',
          payload: {},
        })
      } catch (e: any) {
        dispatch({
          type: ERROR_CATCHED,
          inputName: 'state.isLoading',
          payload: {},
        })
      }
    }
  }

  const toggleView = (): void => {
    dispatch({
      type: TOGGLE_MODE,
      inputName: 'state.isLoginView',
      payload: {},
    })
  }

  return <div></div>
}

export default Login
