import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import React, { useLayoutEffect, useState } from "react";

export default function NameEditDialog({
  productId,
  userId,
  name,
  isOpen,
  setIsOpenEditDialog,
  getProduct,
}) {
  const [newName, setNewName] = useState(name);

  const [disabled, setDisabled] = useState(true);

  const handleClose = () => {
    setIsOpenEditDialog(false);
  };

  const handleSubmit = () => {
    setIsOpenEditDialog(false);

    axios
      .put(`http://localhost:8080/users/${userId}/products/${productId}`, {
        name: newName,
      })
      .then((res) => {
        console.log(res.data);
        getProduct();
      })
      .catch((err) => console.error(err));
  };

  useLayoutEffect(() => {
    if (newName.length > 2) setDisabled(false);
    else setDisabled(true);
  }, [newName]);

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Name</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Edit the name of the product
          </DialogContentText>
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
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {disabled ? (
            <Button onClick={handleSubmit} disabled>
              Submit
            </Button>
          ) : (
            <Button onClick={handleSubmit}>Submit</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
