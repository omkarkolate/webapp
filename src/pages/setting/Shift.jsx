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

export function Shift() {
  const [showModal, setShowModal] = useState(false);
  const [shifts, setShifts] = useState([]);
  const [form, setForm] = useState({
    shiftName: "",
    startTime: "",
    endTime: "",
    hours: "",
  });
  const [editOrAdd, setEditOrAdd] = useState(null);
  const [loader, setLoader] = useState(false);
  const [fetchData, setFetchData] = useState(true);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    if (fetchData) {
      (async function () {
        try {
          const response = await axios.get("/shift");
          setShifts(response.data.shifts);
          if (fetchData) setFetchData(false);
        } catch (error) {
          console.log(error);
          if (fetchData) setFetchData(false);
        }
      })();
    }
  }, [fetchData]);

  const addShift = async () => {
    try {
      setLoader(true);
      const response = await axios.post("/shift", form);
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

  const editShift = async () => {
    try {
      setLoader(true);
      const formCopy = {...form};
      formCopy.shiftId = undefined;
      const response = await axios.put(`/shift/${form.shiftId}`, formCopy);
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

  const deleteShift = async () => {
    try {
      setLoader(true);
      const response = await axios.delete(`/shift/${form.shiftId}`);
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

  const isDisbled = () => {
    if (
      form.shiftName.length < 1 ||
      form.startTime.length < 1 ||
      form.endTime.length < 1
    ) {
      return true;
    }
    return false;
  };

  const modal = (
    <Dialog open={showModal}>
      <DialogContent>
        <DialogContentText>
          * Compulosry fields to submit the form.
        </DialogContentText>
        <TextField
          margin="dense"
          id="shiftname"
          label="Shift name*"
          type="text"
          fullWidth
          value={form.shiftName}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, shiftName: e.target.value }))
          }
        />
        <TextField
          margin="dense"
          id="Start time"
          label="Start time*"
          type="time"
          fullWidth
          value={form.startTime}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, startTime: e.target.value }))
          }
        />
        <TextField
          margin="dense"
          id="End time"
          label="End time*"
          type="time"
          fullWidth
          value={form.endTime}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, endTime: e.target.value }))
          }
        />
        <TextField
          margin="dense"
          id="Hours"
          label="Hours*"
          type="number"
          fullWidth
          value={form.hours}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, hours: e.target.value }))
          }
        />
      </DialogContent>
      <DialogActions>
        <LoadingButton
          variant="contained"
          color="success"
          onClick={() => {
            if (editOrAdd === "Add") addShift();
            if (editOrAdd === "Edit") editShift();
          }}
          loading={loader}
          disabled={isDisbled()}
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
      <DialogTitle>Do you want delete {form.shiftName}?</DialogTitle>
      <DialogActions>
        <LoadingButton
          sx={{ color: "gray" }}
          onClick={() => {
            deleteShift();
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
            setForm({
              shiftName: "",
              startTime: "",
              endTime: "",
              hours: "",
            });
            setEditOrAdd("Add");
            setShowModal(true);
          }}
        >
          Add new Shift
        </Button>
        <List>
          {shifts.map((shift) => (
            <ListItem
              key={shift.shiftId}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  disabled={shift.shiftName === "admin"}
                  onClick={() => {
                    setForm(shift);
                    setIsDelete(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton
                onClick={() => {
                  setForm(shift);
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
                  primary={shift.shiftName}
                  secondary={shift.startTime + " - " + shift.endTime}
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
