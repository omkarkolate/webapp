import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const adminPages = ["Dashboard", "Logs", "Setting"];
const supervisorPages = ["Logs"];

export function Header({active}) {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AutoGraphIcon
            fontSize="large"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ESBEEE Andon Monitor System
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              mr: 4,
            }}
          >
            {user.role === "admin"
              ? adminPages.map((page) => (
                  <Button
                    key={page}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      border: active === page ? "1px solid white" : "0px",
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
                      my: 2,
                      color: "white",
                      display: "block",
                      border: active === page ? "1px solid white" : "0px",
                    }}
                    component={NavLink}
                    to={page === "Logs" ? "/" : `/${page.toLowerCase()}`}
                  >
                    {page}
                  </Button>
                ))}
            <Divider
              orientation="vertical"
              flexItem
              sx={{ bgcolor: "white", mx: 1 }}
            />
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
              sx={{ alignSelf: "center", ml: 1, color: "white" }}
              onClick={() => {
                localStorage.removeItem("userId");
                setUser(null);
                navigate("/login");
              }}
            >
              Log out
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
