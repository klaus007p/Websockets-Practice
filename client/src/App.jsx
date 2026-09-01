import { useEffect } from 'react';
import { useState } from 'react'
import { io } from 'socket.io-client'
import { Box, Container, Stack, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';

function App() {
  // const [count, setCount] = useState(0)
  const socket = useMemo(() => io("http://localhost:3000"), []);
 
  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketId] = useState("");
  const [roomName, setRoomName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit('join-room', roomName);
    setRoomName("");
  }


  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("Connected", socket.id);
    })

    socket.on("recieve message", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
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
      <Box sx={{ height: 200 }} />

      <Typography variant='h2' component="div" gutterBottom>
        {socketID}
      </Typography>

      <form onSubmit={joinRoomHandler}>
        <h5>Join Room</h5>
        <TextField
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          id='outlined-basic'
          label='Room Name'
          variant='outlined' />

        <button type='submit' variant='contained' color='primary'> Join </button>
      </form>


      <form onSubmit={handleSubmit}>
        <TextField value={message} onChange={(e) => setMessage(e.target.value)} id='outlined-basic' label='Message' variant='outlined' />
        <TextField value={room} onChange={(e) => setRoom(e.target.value)} id='outlined-basic' label='Room' variant='outlined' />
        <button type='submit' variant='contained' color='primary'> Send </button>
      </form>

      <Stack>
        {
          messages.map((m, index) => (
            <Typography key={index} variant='h6' component="div" gutterBottom>
              {m}
            </Typography>
          ))
        }
      </Stack>

    </Container>
  )
}

export default App
