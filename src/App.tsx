import React from 'react'
import {
  createTheme,
  ThemeProvider as MuiThemProvider,
} from '@material-ui/core'
import { indigo } from '@material-ui/core/colors'
import Navbar from './components/Navbar'
import ApiContextProvider from './context/ApiContext'
import './App.css'

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: 'Comic Neue',
  },
})

const App: React.FC = () => {
  return (
    <ApiContextProvider>
      <MuiThemProvider theme={theme}>
        <Navbar />
      </MuiThemProvider>
    </ApiContextProvider>
  )
}

export default App
