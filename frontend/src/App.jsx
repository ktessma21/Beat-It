import './App.css'
import TaskCard from './components/TaskCard'
import NavBar from './components/NavBar'

function App() {
  return (
    <div className="font-jersey">
      <NavBar />
      <div className="flex items-center justify-center min-h-screen">
        <TaskCard />
      </div>
    </div>
  )
}

export default App
