import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function FormDialog({ fetchUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  const handleCreate = () => {
    axios
      .post("http://localhost:8080/products/new", {
        name,
        description,
        user: JSON.parse(localStorage.getItem("user")),
        published: false,
      })
      .then((res) => {
        console.log(res.data);
        handleClose();
        fetchUser();
      })
      .catch((err) => console.error(err));
  };

  useLayoutEffect(() => {
    if (name.length > 2) setDisabled(false);
    else setDisabled(true);
  }, [name]);

  return (
    <div>
      <div
        onClick={handleClickOpen}
        className="flex items-center gap-2 cursor-pointer px-4 py-2 text-white rounded font-semibold capitalize bg-blue-700"
      >
        <span>
          <AiOutlinePlus />
        </span>
        <span>New Product</span>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            autoComplete="false"
            margin="dense"
            id="name"
            label="Name of your Product"
            type="text"
            fullWidth
            required
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoComplete="false"
            margin="dense"
            id="name"
            label="Description"
            type="text"
            required
            fullWidth
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {disabled ? (
            <Button onClick={handleCreate} disabled>
              Create Product
            </Button>
          ) : (
            <Button onClick={handleCreate}>Create Product</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
