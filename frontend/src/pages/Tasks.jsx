import {React, useContext} from "react";
import {PageContext} from '../helpers/Contexts'
import TaskCard from '../components/TaskCard'
import NavBar from "../components/NavBar";
import AddPopUp from "../components/AddPopUp";

function Tasks(){
    const {pageState, setPageState} = useContext(PageContext);
    return(
        <div>
            <NavBar />
            <AddPopUp />
            <TaskCard />
        </div>
    )
}

export default Tasks