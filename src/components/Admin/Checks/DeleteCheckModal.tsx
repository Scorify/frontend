import { useMemo, useState } from "react";

import { Box, Button, Modal, TextField, Typography } from "@mui/material";

type props = {
  check: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleDelete: () => void;
};

export default function DeleteCheckModal({
  check,
  open,
  setOpen,
  handleDelete,
}: props) {
  const [confirm, setConfirm] = useState<string>("");
  const match = useMemo(() => confirm === check, [confirm, check]);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translate(-50%, -25%)",
          width: "auto",
          maxWidth: "90vw",
          bgcolor: "background.paper",
          border: `1px solid #000`,
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component='h1' variant='h3'>
            Delete Check
          </Typography>
          <Typography component='h2' variant='body1'>
            To confirm deletion of check, type the name (<b>{check}</b>) of the
            check below.
          </Typography>
          <TextField
            label='Check Name'
            variant='outlined'
            sx={{
              marginTop: "24px",
            }}
            value={confirm}
            onChange={(event) => {
              setConfirm(event.target.value as string);
            }}
          />

          <Button
            variant='contained'
            sx={{ marginTop: "24px" }}
            onClick={handleDelete}
            disabled={!match}
          >
            Delete Check
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
