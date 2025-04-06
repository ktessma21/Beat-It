import {React, useContext} from "react";
import {PageContext} from '../helpers/Contexts'
import TaskCard from '../components/TaskCard'

function Tasks(){
    const {pageState, setPageState} = useContext(PageContext);
    return(
        <div>
            Tasks
            <TaskCard />
        </div>
    )
}

export default Tasks