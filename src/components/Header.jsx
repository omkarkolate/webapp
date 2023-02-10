import { useEffect, useMemo, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Stack } from "@mui/system";
import logo from "../assets/images/ESBEE_EPS_logo.png";
import axios from "axios";

const adminPages = ["Dashboard", "Logs", "Report", "Setting"];
const supervisorPages = ["Dashboard","Logs", "Report",];

export function Header({active}) {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [date, setDate] = useState(new Date());
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/shift");
        setShifts(response.data.shifts);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    const dateInterval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(dateInterval);
  }, []);

  const currentShift = useMemo(() => {
    if (shifts.length < 1) {
      return '';
    }

    const currentHour = date.getHours();
    const currentMinute = date.getMinutes();
  
    for (let i = 0; i < shifts.length; i++) {
      let [startHour, startMinute] = shifts[i].startTime.split(":");
      let [endHour, endMinute] = shifts[i].endTime.split(":");

      startHour = parseInt(startHour);
      startMinute = parseInt(startMinute);
      endHour = parseInt(endHour);
      endMinute = parseInt(endMinute);

      const hours = parseInt(shifts[i].hours);

      if (currentHour === startHour) {
        if (currentMinute >= startMinute) {
          return shifts[i].shiftName;
        }
      } else if (currentHour === endHour) {
        if (currentMinute < endMinute) {
          return shifts[i].shiftName;
        }
      }

      if (startHour + hours >= 24) {
        if (currentHour > startHour || currentHour < endHour) {
          return shifts[i].shiftName;
        }
      } else {
        if (currentHour > startHour && currentHour < endHour) {
          return shifts[i].shiftName;
        }
      }
    }

    return '';
  }, [date, shifts])

  return (
    <AppBar position="sticky">
      <Toolbar disableGutters>
        <img src={logo} alt="Logo" />
        <Typography
          variant="h4"
          noWrap
          component="h4"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Esbee Electrotech LLP
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {user.role === "admin"
            ? adminPages.map((page) => (
                <Button
                  key={page}
                  sx={{
                    color: "white",
                    display: "block",
                    border: "1px solid transparent",
                    borderColor: active === page ? "white" : "transparent",
                    textAlign: "center",
                  }}
                  component={NavLink}
                  to={page === "Dashboard" ? "/" : `/${page.toLowerCase()}`}
                >
                  {page}
                </Button>
              ))
            : supervisorPages.map((page) => (
                <Button
                  key={page}
                  sx={{
                    color: "white",
                    display: "block",
                    border: "1px solid transparent",
                    borderColor: active === page ? "white" : "transparent",
                    textAlign: "center",
                  }}
                  component={NavLink}
                  to={page === "Dashboard" ? "/" : `/${page.toLowerCase()}`}
                >
                  {page}
                </Button>
              ))}
          <Divider
            orientation="vertical"
            flexItem
            sx={{ bgcolor: "white", mx: 1 }}
          />
          <Stack>
            <Typography
              sx={{
                alignSelf: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <PersonIcon /> {user.userName}
            </Typography>
            <Button
              variant="outlined"
              sx={{ alignSelf: "center", color: "lightgray" }}
              onClick={() => {
                localStorage.removeItem("userId");
                setUser(null);
                navigate("/login");
              }}
            >
              Log out
            </Button>
          </Stack>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ bgcolor: "white", mx: 1 }}
          />
          <Stack sx={{ mr: 1, alignItems: "center" }}>
            <Typography variant="body2">{date.toLocaleDateString()}</Typography>
            <Typography variant="body2">
              {date.toLocaleTimeString("en")}
            </Typography>
            <Typography variant="body2">{currentShift}</Typography>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
