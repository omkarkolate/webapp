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

export function Input() {
  const [showModal, setShowModal] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [form, setForm] = useState({
    inputName: "",
  });
  const [editOrAdd, setEditOrAdd] = useState(null);
  const [loader, setLoader] = useState(false);
  const [fetchData, setFetchData] = useState(true);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    if (fetchData) {
      (async function () {
        try {
          const response = await axios.get("/input");
          setInputs(response.data.inputs);
          if (fetchData) setFetchData(false);
        } catch (error) {
          console.log(error);
          if (fetchData) setFetchData(false);
        }
      })();
    }
  }, [fetchData]);

  const addInput = async () => {
    try {
      setLoader(true);
      const response = await axios.post("/input", {
        inputName: form.inputName,
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

  const editInput = async () => {
    try {
      setLoader(true);
      const response = await axios.put(`/input/${form.inputId}`, {
        inputName: form.inputName,
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

  const deleteInput = async () => {
    try {
      setLoader(true);
      const response = await axios.delete(`/input/${form.inputId}`);
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
          id="inputname"
          label="Input name*"
          type="text"
          fullWidth
          value={form.inputName}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, inputName: e.target.value }))
          }
        />
      </DialogContent>
      <DialogActions>
        <LoadingButton
          variant="contained"
          color="success"
          onClick={() => {
            if (editOrAdd === "Add") addInput();
            if (editOrAdd === "Edit") editInput();
          }}
          loading={loader}
          disabled={form.inputName.length < 1}
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
      <DialogTitle>Do you want delete {form.inputName}?</DialogTitle>
      <DialogActions>
        <LoadingButton
          sx={{ color: "gray" }}
          onClick={() => {
            deleteInput();
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
            setForm({ inputName: "" });
            setEditOrAdd("Add");
            setShowModal(true);
          }}
        >
          Add new Input
        </Button>
        <List>
          {inputs.map((input) => (
            <ListItem
              key={input.inputId}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    setForm(input);
                    setIsDelete(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton
                onClick={() => {
                  setForm(input);
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
                  primary={input.inputName}
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
