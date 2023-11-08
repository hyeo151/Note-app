import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
export default function Notes() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch("https://json-server-vercel-puce-nine.vercel.app/notes")
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    await fetch("https://json-server-vercel-puce-nine.vercel.app/notes/" + id, {
      method: "DELETE",
    });

    const newNotes = notes.filter((note) => note.id != id);
    setNotes(newNotes);
  };

  return (
    <Grid container spacing={4} sx={{ px: 30 }}>
      {notes.map((note) => (
        <Grid item xs={4} key={note.id}>
          <Card>
            <CardHeader
              avatar={<Avatar>R</Avatar>}
              action={
                <IconButton onClick={() => handleDelete(note.id)}>
                  <DeleteOutlineIcon />
                </IconButton>
              }
              title={note.title}
              subheader={note.category}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {note.details}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
