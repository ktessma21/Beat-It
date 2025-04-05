import './index.css'
import TaskCard from './components/taskCard'
import NavBar from './components/navBar'

function App() {
  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen">
        <TaskCard />
      </div>
      
    </>
  )
}

export default App
