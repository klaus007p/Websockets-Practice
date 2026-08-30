import { useEffect } from 'react';
import { useState } from 'react'
import { io } from 'socket.io-client'
import { Container, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';

function App() {
  // const [count, setCount] = useState(0)
  const socket = useMemo(() => io("http://localhost:3000"),[]);


  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    
  };


  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);
    })

    socket.on("recieve message", (data) => {
      console.log(data);
      
    })

    socket.on("welcome", (s) => {
      console.log(s);
      
    })

    // return () => {               // useeffect fires a callback when component unmount and it trigger a cleanup function 
    //   socket.disconnect();
    // }
  },[])


  return (
    <Container maxWidth='sm'>
      <Typography variant='h1' component="div" gutterBottom>
        Welcome to the Socketio App
      </Typography>

      <form onSubmit={handleSubmit}>
          <TextField value={message} onChange={(e)=> setMessage(e.target.value)} id='outlined-basic' label='Outlined' variant='outlined'/>
          <button type='submit' variant='contained' color='primary'> Send </button>
      </form>

    </Container>
  )
}

export default App
