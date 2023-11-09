import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import React, { useLayoutEffect, useState } from "react";

export default function FeatureNameEditDialog({
  productId,
  featureId,
  title,
  isOpenFeatureNameEditDialog,
  setIsOpenFeatureNameEditDialog,
  getFeature,
}) {
  const [newTitle, setNewtitle] = useState(title);

  const [disabled, setDisabled] = useState(true);

  const handleClose = () => {
    setIsOpenFeatureNameEditDialog(false);
  };

  const handleSubmit = () => {
    setIsOpenFeatureNameEditDialog(false);

    axios
      .put(
        `http://localhost:8080/products/${productId}/features/${featureId}`,
        {
          title: newTitle,
        }
      )
      .then((res) => {
        console.log(res.data);
        getFeature();
      })
      .catch((err) => console.error(err));
  };

  useLayoutEffect(() => {
    if (newTitle !== null && newTitle.length > 2) setDisabled(false);
    else setDisabled(true);
  }, [newTitle]);

  return (
    <div>
      <Dialog
        open={isOpenFeatureNameEditDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Title</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            autoComplete="false"
            margin="dense"
            id="name"
            label="Feature Title"
            type="text"
            fullWidth
            required
            variant="standard"
            value={newTitle}
            onChange={(e) => setNewtitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {disabled ? (
            <Button onClick={handleSubmit} disabled>
              Submit
            </Button>
          ) : (
            <Button onClick={handleSubmit}>Update</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
