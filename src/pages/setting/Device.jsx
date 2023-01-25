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

const defaultDeviceState = {
  deviceName: "",
  groupName: "",
  problem1: "",
  problem2: "",
  problem3: "",
  problem4: "",
  problem5: "",
  problem6: "",
  problem7: "",
  problem8: "",
  problem9: "",
  problem10: "",
};

export function Device() {
  const [showModal, setShowModal] = useState(false);
  const [devices, setDevices] = useState([]);
  const [groups, setGroups] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [form, setForm] = useState(defaultDeviceState);
  const [editOrAdd, setEditOrAdd] = useState(null);
  const [loader, setLoader] = useState(false);
  const [fetchData, setFetchData] = useState(true);
  const [isDelete, setIsDelete] = useState(false);



  useEffect(() => {
    if (fetchData) {
      (async function () {
        try {
          const responses = await Promise.all([
            axios.get("/device"),
            axios.get("/group"),
            axios.get("/input"),
          ]);

          setDevices(responses[0].data.devices);
          setGroups(responses[1].data.groups);
          setInputs(responses[2].data.inputs);
          if (fetchData) setFetchData(false);
        } catch (error) {
          console.log(error);
          if (fetchData) setFetchData(false);
        }
      })();
    }
  }, [fetchData]);

  const addDevice = async () => {
    try {
      setLoader(true);
      const response = await axios.post("/device", form);
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

  const editDevice = async () => {
    try {
      setLoader(true);
      const response = await axios.put(`/device/${form.deviceId}`, form);
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

  const deleteDevice = async () => {
    try {
      setLoader(true);
      const response = await axios.delete(`/device/${form.deviceId}`);
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

  const renderProblems = () => {
      const problems = [];

    for (let i = 1; i <= 10; i++) { 
        problems.push(
          <FormControl key={`Problem ${i}`} fullWidth sx={{ mt: 1 }}>
            <InputLabel id={`Problem ${i}`}>{`Problem ${i}`}</InputLabel>
            <Select
              labelId={`Problem ${i}`}
              id={`Problem ${i}`}
              label={`Problem ${i}`}
              value={form[`problem${i}`] ?? ''}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  [`problem${i}`]: e.target.value,
                }))
              }
            >
              {inputs.map((input) => (
                <MenuItem key={input.inputId} value={input.inputName}>
                  {input.inputName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }
      return problems;
  }

  const modal = (
    <Dialog open={showModal}>
      <DialogContent>
        <DialogContentText>
          * Compulosry fields to submit the form.
        </DialogContentText>
        <TextField
          margin="dense"
          id="devicename"
          label="Device name*"
          type="text"
          fullWidth
          value={form.deviceName}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, deviceName: e.target.value }))
          }
        />
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel id="groupName">Group Name*</InputLabel>
          <Select
            labelId="groupName"
            id="groupName"
            label="Group Name*"
            value={form.groupName}
            onChange={(e) => {
              console.log("onChnage: ", e.target.value);
              setForm((prev) => ({ ...prev, groupName: e.target.value }));
            }}
          >
            {groups.map((group) => (
              <MenuItem key={group.groupId} value={group.groupName}>
                {group.groupName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {renderProblems()}
      </DialogContent>
      <DialogActions>
        <LoadingButton
          variant="contained"
          color="success"
          onClick={() => {
            if (editOrAdd === "Add") addDevice();
            if (editOrAdd === "Edit") editDevice();
          }}
          loading={loader}
          disabled={form.deviceName.length < 1}
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
      <DialogTitle>Do you want delete {form.deviceName}?</DialogTitle>
      <DialogActions>
        <LoadingButton
          sx={{ color: "gray" }}
          onClick={() => {
            deleteDevice();
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

  const isGroupInList = (device) => {
    const group = groups.find((group) => group.groupName === device.groupName);
    if (!group) {
      setGroups((groups) => [
        {
          groupId: device.groupName,
          groupName: device.groupName,
        },
        ...groups,
      ]);
    }
  }

  const isProblemInList = (device) => {
    const inputList = [...inputs];
    for (let i = 1; i <= 10 ; i++) {
      const problem = inputList.find(input => input.inputName === device[`problem${i}`]);

      if (!problem && device[`problem${i}`]) {
        inputList.unshift({
          inputId: device[`problem${i}`],
          inputName: device[`problem${i}`],
        });
      }     
    }
    setInputs([...inputList]);
  }

  const onEdit = (device) => {
    isGroupInList(device);
    isProblemInList(device);
    setForm(device);
    setEditOrAdd("Edit");
    setShowModal(true);
  }

  return (
    <Box>
      <Header active="Setting" />
      <Container maxWidth="sm" sx={{ pt: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => {
            setForm(defaultDeviceState);
            setEditOrAdd("Add");
            setShowModal(true);
          }}
        >
          Add new Device
        </Button>
        <List>
          {devices.map((device) => (
            <ListItem
              key={device.deviceId}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    setForm(device);
                    setIsDelete(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton
                onClick={() => onEdit(device)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <EditIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={device.deviceName}
                  secondary={device.groupName}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Container>
      {showModal && modal} {isDelete && deleteModal}
    </Box>
  );
}
