import { useEffect } from 'react';
import { useState } from 'react'
import { io } from 'socket.io-client'


function App() {
  // const [count, setCount] = useState(0)
  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);
    })

    socket.on("welcome", (s) => {
      console.log(s);
      
    })

  },[])


  return (
    <>
      <div>Hello sir How are you doing! </div>
    </>
  )
}

export default App
