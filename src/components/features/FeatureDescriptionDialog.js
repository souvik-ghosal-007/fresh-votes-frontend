import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

export default function FeatureDescriptionDialog({
  description,
  isOpenFeatureDescriptionDialog,
  setIsOpenFeatureDescriptionDialog,
}) {
  const scroll = "paper";

  const handleClose = () => {
    setIsOpenFeatureDescriptionDialog(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (isOpenFeatureDescriptionDialog) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [isOpenFeatureDescriptionDialog]);

  function addNewlineAfterTenWords(inputString) {
    if (inputString === null) return "";
    const words = inputString.split(" ");
    const lines = [];

    for (let i = 0; i < words.length; i += 10) {
      const line = words.slice(i, i + 10).join(" ");
      lines.push(line);
    }

    return lines.join("\n");
  }

  return (
    <div>
      <Dialog
        open={isOpenFeatureDescriptionDialog}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Description</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {addNewlineAfterTenWords(description)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
