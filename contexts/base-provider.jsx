'use client'
import { StyledEngineProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'

export default function BaseProvider({ children }) {
  return (
    <StyledEngineProvider injectFirst>
      <body className="" id="_next">
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          {children}
        </SnackbarProvider>
      </body>
    </StyledEngineProvider>
  )
}
