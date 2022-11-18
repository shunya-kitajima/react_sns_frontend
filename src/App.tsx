import React from 'react'
import { createTheme } from '@material-ui/core'
import { ThemeProvider as MuiThemProvider } from '@material-ui/core'
import { indigo } from '@material-ui/core/colors'
import logo from './logo.svg'
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
