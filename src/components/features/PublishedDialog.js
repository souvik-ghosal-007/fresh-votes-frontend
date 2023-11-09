import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import * as React from "react";

export default function PublishedDialog({
  productId,
  published,
  isOpen,
  setIsOpenDialog,
  getProduct,
}) {
  const userId = JSON.parse(localStorage.getItem("user")).id;

  const handleClose = () => {
    setIsOpenDialog(false);
  };

  const handleSubmit = () => {
    setIsOpenDialog(false);

    axios
      .put(`http://localhost:8080/users/${userId}/products/${productId}`, {
        published: !published,
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
        <DialogTitle id="alert-dialog-title">Published Status</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Do you want to ${
              published ? "unpublish" : "publish"
            } this product ?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus>
            {published ? "Unpublish" : "Publish"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
