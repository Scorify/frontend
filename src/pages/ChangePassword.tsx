import { useState } from "react";

import { enqueueSnackbar } from "notistack";
import { useMutation } from "@apollo/client";
import { Container, Box, Typography, Button } from "@mui/material";

import { PasswordInput } from "../components";
import { CHANGE_PASSWORD } from "../queries";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [changePasswordMutation, {}] = useMutation(CHANGE_PASSWORD);

  const changePassword = () => {
    changePasswordMutation({
      variables: {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
    })
      .then((response) => {
        if (response.data.changePassword) {
          enqueueSnackbar("Password changed successfully", {
            variant: "success",
          });
        }
      })
      .catch((error) => {
        enqueueSnackbar("Invalid username or password", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant='h3'>Change Password</Typography>
        <PasswordInput
          label='Old Password'
          margin='normal'
          onChange={(e) => {
            setOldPassword(e.target.value);
          }}
        />
        <PasswordInput
          label='New Password'
          margin='normal'
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
        <PasswordInput
          label='Confirm New Password'
          margin='normal'
          onChange={(e) => {
            setConfirmNewPassword(e.target.value);
          }}
        />
        {newPassword &&
          confirmNewPassword &&
          newPassword !== confirmNewPassword && (
            <Typography color='error'>Passwords do not match</Typography>
          )}
        <Box sx={{ m: 1 }} />
        <Button
          variant='contained'
          fullWidth
          onClick={() => {
            if (
              newPassword &&
              confirmNewPassword &&
              newPassword === confirmNewPassword
            ) {
              changePassword();
            } else {
              enqueueSnackbar("Passwords do not match", { variant: "error" });
            }
          }}
        >
          <Typography>Change Password</Typography>
        </Button>
      </Box>
    </Container>
  );
}
