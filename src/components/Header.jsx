import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const adminPages = ["Dashboard", "Logs", "Setting"];
const supervisorPages = ["Logs"];

export function Header({active}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
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
            {user.role === "admin" ? adminPages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  borderBottom: active === page ? "1px solid white" : "0px",
                }}
                component={NavLink}
                to={page === "Dashboard" ? "/" : `/${page.toLowerCase()}`}
              >
                {page}
              </Button>
            )): supervisorPages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  borderBottom: active === page ? "1px solid white" : "0px",
                }}
                component={NavLink}
                to={page === "Logs" ? "/" : `/${page.toLowerCase()}`}
              >
                {page}
              </Button>))}
            <Button
              variant="contained"
              color="secondary"
              sx={{ alignSelf: "center", ml: 1 }}
              onClick={() => {
                localStorage.removeItem('userId');
                setUser(null)
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
