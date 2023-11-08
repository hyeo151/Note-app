import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Notes from "./pages/Notes";
import Create from "./pages/Create";
import RootLayout from "./layouts/RootLayout";
import { ThemeProvider, createTheme } from "@mui/material";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route index element={<Notes />}></Route>
      <Route path="/create" element={<Create />}></Route>
    </Route>
  )
);

const theme = createTheme({
  typography: {
    fontFamily: ["Quicksand", "sans-serif"].join(","),
  },
  palette: {
    background: {
      default: "rgb(249, 249, 249)",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
