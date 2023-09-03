import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function FeatureDialog({ productId, getProduct }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
  };

  const handleCreate = () => {
    axios
      .post(`http://localhost:8080/products/${productId}/features`, {
        title,
        description,
        status: "closed",
      })
      .then((res) => {
        console.log(res.data);
        getProduct();
        handleClose();
      })
      .catch((err) => console.error(err));
  };

  useLayoutEffect(() => {
    if (title.length > 2) setDisabled(false);
    else setDisabled(true);
  }, [title]);

  return (
    <div>
      <div
        className="flex items-center gap-2 cursor-pointer px-2 py-1 text-white rounded font-semibold capitalize bg-blue-700"
        onClick={handleClickOpen}
      >
        <span>
          <AiOutlinePlus size={11} />
        </span>
        <span className="text-[11px]">Add Feature</span>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new Feature</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            autoComplete="false"
            margin="dense"
            id="name"
            label="Name of your new Feature"
            type="text"
            fullWidth
            required
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            autoComplete="false"
            margin="dense"
            id="name"
            label="Description of your new Feature"
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
              Create Feature
            </Button>
          ) : (
            <Button onClick={handleCreate}>Create Feature</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
