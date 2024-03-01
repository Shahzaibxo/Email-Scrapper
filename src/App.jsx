import {NextUIProvider} from "@nextui-org/react";
import { useState } from 'react'
import Navbarr from './Navbar'
import Landingg from './Landing'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NextUIProvider>
    <Navbarr/>
    <Landingg/>  
    </NextUIProvider>
    </>
  )
}

export default App
