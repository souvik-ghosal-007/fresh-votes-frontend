import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import React, { useState } from "react";

export default function DescriptionEditDialog({
  productId,
  featureId,
  description,
  isOpenFeatureDescriptionEditDialog,
  setIsOpenFeatureDescriptionEditDialog,
  getFeature,
}) {
  const [newDescription, setNewDescription] = useState(description);

  const handleClose = () => {
    setIsOpenFeatureDescriptionEditDialog(false);
  };

  const handleSubmit = () => {
    setIsOpenFeatureDescriptionEditDialog(false);

    axios
      .put(
        `http://localhost:8080/products/${productId}/features/${featureId}`,
        {
          description: newDescription,
        }
      )
      .then((res) => {
        console.log(res.data);
        getFeature();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Dialog
        open={isOpenFeatureDescriptionEditDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Description</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            autoComplete="false"
            margin="dense"
            id="description"
            label="Description of your Feature"
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
