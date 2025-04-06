import {React, useContext} from "react";
import {PageContext} from '../helpers/Contexts'
import TaskCard from '../components/TaskCard'

function Habits(){
    const {pageState, setPageState} = useContext(PageContext);
    return(
        <div>
            Habits
        </div>
    )
}

export default Habits