import './App.css'
import {React, useState} from 'react'
import Login from './pages/Login'
import Tasks from './pages/Tasks'
import Habits from './pages/Habits'
import AddPopUp from './components/AddPopUp';

import {PageContext} from './helpers/Contexts'

function App() {
  const [pageState, setPageState] = useState("login");
  const [popUpState, setPopUpState] = useState(false);

  return (
    <div className="font-jersey">
      <PageContext.Provider value={{pageState, setPageState, popUpState, setPopUpState}}>
        {pageState === "login" && <Login />}
        {pageState === "tasks" && <Tasks />}
        {pageState === "habits" && <Habits />}
        {popUpState === true && <AddPopUp />} 
      </PageContext.Provider>
    </div>
  )
}

export default App
