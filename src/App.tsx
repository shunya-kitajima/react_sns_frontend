import React from 'react'
import { createTheme } from '@material-ui/core'
import { ThemeProvider as MuiThemProvider } from '@material-ui/core'
import { indigo } from '@material-ui/core/colors'

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
  return <MuiThemProvider theme={theme}></MuiThemProvider>
}

export default App
