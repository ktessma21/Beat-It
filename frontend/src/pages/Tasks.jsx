import {React, useContext} from "react";
import {PageContext} from '../helpers/Contexts'
import TaskCard from '../components/TaskCard'
import NavBar from "../components/NavBar";

function Tasks(){
    const {pageState, setPageState} = useContext(PageContext);
    return(
        <div>
            <NavBar />
            <h1>Tasks</h1>
            <TaskCard />
        </div>
    )
}

export default Tasks