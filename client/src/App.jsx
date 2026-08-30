import { useEffect } from 'react';
import { useState } from 'react'
import { io } from 'socket.io-client'
import { Box, Container, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';

function App() {
  // const [count, setCount] = useState(0)
  const socket = useMemo(() => io("http://localhost:3000"), []);


  const [message, setMessage] = useState("")
  const [room, setRoom] = useState("");
  const [socketID, setSocketId] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", {message, room});
    setMessage("");
  };


  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
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
  }, [])


  return (
    <Container maxWidth='sm'>
      <Box sx={{ height: 200}}/>

      <Typography variant='h2' component="div" gutterBottom>
        {socketID}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField value={message} onChange={(e) => setMessage(e.target.value)} id='outlined-basic' label='Message' variant='outlined' />
        <TextField value={room} onChange={(e) => setRoom(e.target.value)} id='outlined-basic' label='Room' variant='outlined' />
        <button type='submit' variant='contained' color='primary'> Send </button>
      </form>

    </Container>
  )
}

export default App
