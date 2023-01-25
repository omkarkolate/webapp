import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { Header } from "../../components";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";

export function User() {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    userName: "",
    password: "",
    role: "",
  });
  const [editOrAdd, setEditOrAdd] = useState(null);
  const [loader, setLoader] = useState(false);
  const [fetchData, setFetchData] = useState(true);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    if (fetchData) {
      (async function () {
        try {
          const response = await axios.get("/user");
          setUsers(response.data.users);
          if (fetchData) setFetchData(false);
        } catch (error) {
          console.log(error);
          if (fetchData) setFetchData(false);
        }
      })();
    }
  }, [fetchData]);

  const addUser = async () => {
    try {
      setLoader(true);
      const response = await axios.post("/user", {
        userName: form.userName,
        password: form.password,
        role: form.role,
      });
      if (response.data.success) {
        setLoader(false);
        setFetchData(true);
        setShowModal(false); 
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const editUser = async () => {
    try {
      setLoader(true);
      const response = await axios.put(`/user/${form.userId}`, {
        userName: form.userName,
        password: form.password,
        role: form.role,
      });
      if (response.data.success) {
        setLoader(false);
        setFetchData(true);
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const deleteUser = async () => {
    try {
      setLoader(true);
      const response = await axios.delete(`/user/${form.userId}`);
      if (response.data.success) {
        setLoader(false);
        setFetchData(true);
        setIsDelete(false);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
      setIsDelete(false);
    }
  };

  const modal = (
    <Dialog open={showModal}>
      <DialogContent>
        <DialogContentText>
          * Compulosry fields to submit the form.
        </DialogContentText>
        <TextField
          margin="dense"
          id="username"
          label="User name*"
          type="text"
          fullWidth
          value={form.userName}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, userName: e.target.value }))
          }
        />
        <TextField
          margin="dense"
          id="password"
          label="Password*"
          type="text"
          fullWidth
          value={form.password}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel id="label">Role*</InputLabel>
          <Select
            labelId="label"
            id="label"
            label="Role*"
            value={form.role}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, role: e.target.value }))
            }
          >
            <MenuItem value={"admin"}>Admin</MenuItem>
            <MenuItem value={"supervisor"}>Supervisor</MenuItem>
            <MenuItem value={"mobileapp"}>Mobile App</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          variant="contained"
          color="success"
          onClick={() => {
            if (editOrAdd === "Add") addUser();
            if (editOrAdd === "Edit") editUser();
          }}
          loading={loader}
          disabled={
            form.userName.length < 1 ||
            form.password.length < 1 ||
            form.role.length < 1
          }
        >
          Save
        </LoadingButton>
        <Button
          sx={{ color: "gray" }}
          onClick={() => setShowModal(false)}
          disabled={loader}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );

  const deleteModal = (
    <Dialog open={isDelete}>
      <DialogTitle>Do you want delete {form.userName}?</DialogTitle>
      <DialogActions>
        <LoadingButton
          sx={{ color: "gray" }}
          onClick={() => {
            deleteUser();
          }}
          loading={loader}
        >
          Delete
        </LoadingButton>
        <Button onClick={() => setIsDelete(false)} disabled={loader}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box>
      <Header active="Setting" />
      <Container maxWidth="sm" sx={{ pt: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => {
            setForm({ userName: "", password: "", role: "" });
            setEditOrAdd("Add");
            setShowModal(true);
          }}
        >
          Add new User
        </Button>
        <List>
          {users.map((user) => (
            <ListItem
              key={user.userId}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  disabled={user.userName === "admin"}
                  onClick={() => {setForm(user); setIsDelete(true); }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton
                onClick={() => {
                  setForm(user);
                  setEditOrAdd("Edit");
                  setShowModal(true);
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <EditIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.userName} secondary={user.role} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Container>
      {modal} {deleteModal}
    </Box>
  );
}
