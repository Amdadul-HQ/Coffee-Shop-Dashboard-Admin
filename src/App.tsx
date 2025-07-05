import { Link } from "react-router-dom"
import { Button } from "./components/ui/button"

function App() {

  return (
   <div className="h-screen w-full flex justify-center items-center">
    <Link to='/dashboard/admin'>
    <Button>
      Go to Admin Dashboard
    </Button>
    </Link>
   </div>
  )
}

export default App
