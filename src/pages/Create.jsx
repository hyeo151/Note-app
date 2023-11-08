import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailError, setDetailError] = useState(false);
  const [category, setCategory] = useState("todos");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    setTitleError(false);
    setDetailError(false);

    if (title === "") {
      setTitleError(true);
    }
    if (detail === "") {
      setDetailError(true);
    }
    if (title && detail) {
      fetch("https://json-server-vercel-puce-nine.vercel.app/notes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, detail, category }),
      }).then(() => navigate("/"));
    }
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h6">Create a New Note</Typography>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          label="Note Title"
          variant="outlined"
          fullWidth
          required
          error={titleError}
          sx={{ my: "20px", display: "block" }}
        />
        <TextField
          onChange={(e) => setDetail(e.target.value)}
          label="Details"
          variant="outlined"
          fullWidth
          required
          multiline
          rows="4"
          error={detailError}
          sx={{ my: "20px", display: "block" }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel id="demo-radio-buttons-group-label">
            Note Category
          </FormLabel>
          <RadioGroup
            defaultValue="money"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="Todos" control={<Radio />} label="Todos" />
            <FormControlLabel
              value="reminders"
              control={<Radio />}
              label="Reminders"
            />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
          sx={{ mb: 2 }}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
