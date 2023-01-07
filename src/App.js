import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { RequireAuth } from "./components";
import { useAuth } from "./context/AuthContext";
import { Dashboard, Login, Logs } from "./pages";

axios.defaults.baseURL = "http://192.168.0.146:4000";

function App() {
  const [loader, setLoader] = useState(true);
  const {user, setUser} = useAuth();
  const navigate = useNavigate();
  console.log("loged", user, loader);
  useEffect(() => {
    (async function(params) {
      const userId = localStorage.getItem("userId") || null;
      
      const getUser = async (userId) => {
        try {
         const response = await axios.get(`/user/${userId}`);

         if (response.data.success) {
           setUser(response.data.user);
         } else {
           navigate("/login");
         } 
        } catch (error) {
          console.log(error);
        }
      };

      if (userId) {
        await getUser(userId);
        setLoader(false);
      } else {
        setLoader(false);
      }    
    }) ()
  }, []);

  if (loader) {
    return <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh"}}>
      <CircularProgress />
      <Typography variant="h2"  sx={{ml: 2}}>Loading...</Typography>
    </Box>
  }

  if (user && user?.role === "admin") {
    return (
      <>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="logs"
            element={
              <RequireAuth>
                <Logs />
              </RequireAuth>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </>
    );
  } else {
    return (
      <>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Logs />
              </RequireAuth>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </>
    );
  } 
}

export default App;
