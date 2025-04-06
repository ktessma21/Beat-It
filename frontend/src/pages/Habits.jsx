import {React, useContext} from "react";
import {PageContext} from '../helpers/Contexts'
import TaskCard from '../components/TaskCard'
import NavBar from "../components/NavBar";

function Habits(){
    const {pageState, setPageState} = useContext(PageContext);
    return(
        <div>
            <NavBar />
            <h1>Habits</h1>
            <TaskCard />
        </div>
    )
}

export default Habits