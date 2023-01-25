import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
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

export function Group() {
  const [showModal, setShowModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [form, setForm] = useState({
    groupName: "",
  });
  const [editOrAdd, setEditOrAdd] = useState(null);
  const [loader, setLoader] = useState(false);
  const [fetchData, setFetchData] = useState(true);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    if (fetchData) {
      (async function () {
        try {
          const response = await axios.get("/group");
          setGroups(response.data.groups);
          if (fetchData) setFetchData(false);
        } catch (error) {
          console.log(error);
          if (fetchData) setFetchData(false);
        }
      })();
    }
  }, [fetchData]);

  const addGroup = async () => {
    try {
      setLoader(true);
      const response = await axios.post("/group", {
        groupName: form.groupName,
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

  const editGroup = async () => {
    try {
      setLoader(true);
      const response = await axios.put(`/group/${form.groupId}`, {
        groupName: form.groupName,
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

  const deleteGroup = async () => {
    try {
      setLoader(true);
      const response = await axios.delete(`/group/${form.groupId}`);
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
          id="groupname"
          label="Group name*"
          type="text"
          fullWidth
          value={form.groupName}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, groupName: e.target.value }))
          }
        />
      </DialogContent>
      <DialogActions>
        <LoadingButton
          variant="contained"
          color="success"
          onClick={() => {
            if (editOrAdd === "Add") addGroup();
            if (editOrAdd === "Edit") editGroup();
          }}
          loading={loader}
          disabled={form.groupName.length < 1}
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
      <DialogTitle>Do you want delete {form.groupName}?</DialogTitle>
      <DialogActions>
        <LoadingButton
          sx={{ color: "gray" }}
          onClick={() => {
            deleteGroup();
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
            setForm({ groupName: "" });
            setEditOrAdd("Add");
            setShowModal(true);
          }}
        >
          Add new Group
        </Button>
        <List>
          {groups.map((group) => (
            <ListItem
              key={group.groupId}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    setForm(group);
                    setIsDelete(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton
                onClick={() => {
                  setForm(group);
                  setEditOrAdd("Edit");
                  setShowModal(true);
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <EditIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={group.groupName}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Container>
      {modal} {deleteModal}
    </Box>
  );
}
