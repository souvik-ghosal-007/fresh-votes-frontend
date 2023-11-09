import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import React, { useState } from "react";

export default function DescriptionEditDialog({
  productId,
  userId,
  description,
  isOpen,
  setIsOpenEditDialog,
  getProduct,
}) {
  const [newDescription, setNewDescription] = useState(description);

  const handleClose = () => {
    setIsOpenEditDialog(false);
  };

  const handleSubmit = () => {
    setIsOpenEditDialog(false);

    axios
      .put(`http://localhost:8080/users/${userId}/products/${productId}`, {
        description: newDescription,
      })
      .then((res) => {
        console.log(res.data);
        getProduct();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Description</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Edit the description of the product
          </DialogContentText>
          <TextField
            autoFocus
            autoComplete="false"
            margin="dense"
            id="description"
            label="Description of your Product"
            type="text"
            fullWidth
            required
            variant="standard"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
