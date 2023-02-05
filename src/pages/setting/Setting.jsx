import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Header } from "../../components";
import { Container } from "@mui/system";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GroupIcon from "@mui/icons-material/Group";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ListAltIcon from "@mui/icons-material/ListAlt";
import InputIcon from "@mui/icons-material/Input";
import { useNavigate } from "react-router-dom";

const settings = [
  {
    title: "User",
    Icon: <ManageAccountsIcon fontSize="large" />,
    path: "/setting/user",
  },
  {
    title: "Group",
    Icon: <GroupIcon fontSize="large" />,
    path: "/setting/group",
  },
  {
    title: "Shift",
    Icon: <AccessTimeIcon fontSize="large" />,
    path: "/setting/shift",
  },
  {
    title: "Input",
    Icon: <InputIcon fontSize="large" />,
    path: "/setting/input",
  },
  {
    title: "Device",
    Icon: <ListAltIcon fontSize="large" />,
    path: "/setting/device",
  },
];

export function Setting() {
    const navigate = useNavigate();
  return (
    <Box>
      <Header active="Setting" />
      <Typography variant="h3" sx={{ my: 2, textAlign: "center" }}>
        Setting
      </Typography>
      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <List>
          {settings.map((setting, index) => (
              <ListItem key={index} onClick={() => navigate(setting.path)}>
              <ListItemButton>
                <ListItemIcon>
                          {setting.Icon}
                </ListItemIcon>
                      <ListItemText primary={setting.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
}
