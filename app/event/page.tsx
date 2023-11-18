"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import {
  IconButton,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import useEvents from "./useEvents";
import { Events } from "../_settings/interfaces";

export default function Event() {
  const [events, setEvents, addEvent, deleteEvent, updateEvent] = useEvents();
  //const [newEvent, setNewEvent] = useState({ name: "", location: "" });

  const [newEvent, setNewEvent] = useState<Events>({
    id: "",
    name: "",
    location: "",
  });
  const [status, setStatus] = useState({ visible: false });

  // const [newEvent, setNewEvent] = useState({ name: "", location: "", startDate: new Date, endDate: Date });

  // function add() {
  //   addEvent(newEvent);
  //   //setEvents((prev) => [...prev, { ...newEvent }]);
  //   setNewEvent({ name: "", location: "" });
  //   console.log(events);
  // }
  const hide = () => {
    setStatus({ ...status, visible: false });
    resetEvent();
  };
  const show = () => {
    setStatus({ ...status, visible: true });
  };
  const resetEvent = () => {
    setNewEvent({ id: "", name: "", location: "" });
  };

  function setUpdateEvent(event: Events) {
    setNewEvent({ ...event });
    setStatus({ ...status, visible: true });
  }

  const handleClick = function (e: React.ChangeEvent<HTMLInputElement>) {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };
  function addOrUpdate() {
    if (newEvent.id === "") {
      addEvent(newEvent);
    } else {
      updateEvent(newEvent);
    }
    setStatus({ ...status, visible: false });
    resetEvent();
  }

  return (
    <div>
      <Dialog
        open={status.visible}
        onClose={hide}
        aria-labelledby={newEvent.id === "" ? "新增活動" : "更新活動"}
      >
        <DialogTitle>
          {newEvent.id === "" ? "新增活動" : "更新活動"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="活動描述"
            variant="outlined"
            name="name"
            value={newEvent.name}
            onChange={handleClick}
          />
          <p />
          <TextField
            label="活動地點   "
            variant="outlined"
            name="location"
            value={newEvent.location}
            onChange={handleClick}
          />
          <p />
        </DialogContent>
        <DialogActions>
          <IconButton
            aria-label="close"
            onClick={hide}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Button variant="contained" color="primary" onClick={addOrUpdate}>
            {newEvent.id === "" ? "新增活動" : "更新活動"}
          </Button>
        </DialogActions>
      </Dialog>

      {events.map((event, index) => (
        <div key={index}>
          <div>
            <span>
              <b>{event.name}</b>
            </span>
            <span> - </span>
            <span>{event.location}</span>
            <span>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteEvent(event.id)}
              >
                <DeleteIcon />
              </IconButton>
            </span>
            <span>
              <IconButton
                edge="end"
                aria-label="update"
                onClick={() => setUpdateEvent(event)}
              >
                <EditIcon />
              </IconButton>
            </span>
          </div>
          {/* <p>{event.startDate}</p>
                    <p>{event.endDate}</p> */}

          {/* <button onClick={() => setEvents(events.filter((p, i) => i!== index))}>Delete</button> */}
        </div>
      ))}
      <Button variant="contained" color="primary" onClick={show}>
        新增
      </Button>
      {/* <input type="text" name="name" onChange={handleClick} />
      <input type="text" name="location" onChange={handleClick} /> */}
    </div>
  );
}
