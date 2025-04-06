import './App.css'
import {React, useState} from 'react'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import Tasks from './pages/Tasks'
import Habits from './pages/Habits'

import {PageContext} from './helpers/Contexts'

function App() {
  const [pageState, setPageState] = useState("login");

  return (
    <div className="font-jersey">
      <PageContext.Provider value={{pageState, setPageState}}>
        <div className="body">
          <img
            className="w-40 m-10"
            src="/pictures/logo.png"
            alt="Logo"
          />
          {pageState === "login" && <Login />}
          {pageState === "tasks" && <Tasks />}
          {pageState === "habits" && <Habits />}
        </div>
      </PageContext.Provider>
    </div>
  )
}

export default App
