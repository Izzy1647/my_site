import React from 'react'
import { hydrate, render } from 'react-dom'
import App from './App'

// See https://reactjs.org/docs/strict-mode.html
const StrictApp = () => (
  <React.StrictMode>
    <header style={{
      "text-align": "center",
      "border": "solid",
      "background": "black",
      "color": "white",
      "fontWeight": "bold",
      "letterSpacing": "4px"

    }}>
      No Control, No Lockdown, Let People Speak 🇨🇳
    </header>
    <App />
  </React.StrictMode>
)

const rootElement = document.getElementById('root')

// hydrate is required by react-snap.
if (rootElement.hasChildNodes()) {
  hydrate(<StrictApp />, rootElement)
} else {
  render(<StrictApp />, rootElement)
}
