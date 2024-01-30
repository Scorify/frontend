import { useEffect, useState } from "react";

import { Box, Button, Modal, TextField, Typography } from "@mui/material";

type props = {
  user: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleDelete: () => void;
};

export default function DeleteUserModal({
  user,
  open,
  setOpen,
  handleDelete,
}: props) {
  const [confirm, setConfirm] = useState<string>("");
  const [match, setMatch] = useState<boolean>(false);

  useEffect(() => {
    setMatch(confirm === user);
  }, [confirm, user]);

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
            Delete User
          </Typography>
          <Typography component='h2' variant='body1'>
            To confirm deletion of user, type the name (<b>{user}</b>) of the
            user below.
          </Typography>
          <TextField
            label='User Name'
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
            Delete User
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
