import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Signup from './pages/signup'


function App() {
  const [count, setCount] = useState(0)

  return (
<div>
 <Signup />
</div>
  )
}

export default App
