import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Container, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";

import { PasswordInput } from "../components";
import { useChangePasswordMutation } from "../graph";
import { RemoveCookie } from "../models";

type props = {
  removeCookie: RemoveCookie;
};

export default function ChangePassword({ removeCookie }: props) {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const [changePasswordMutation] = useChangePasswordMutation({
    onCompleted: () => {
      removeCookie("auth");

      navigate("/login");

      enqueueSnackbar(
        "Password changed successfully, please reauthenticate with new one",
        {
          variant: "success",
        }
      );
    },
    onError: (error) => {
      enqueueSnackbar("Encountered an error: " + error.message, {
        variant: "error",
      });
      console.error(error);
    },
  });

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
          fullWidth
        />
        <PasswordInput
          label='New Password'
          margin='normal'
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
          fullWidth
        />
        <PasswordInput
          label='Confirm New Password'
          margin='normal'
          onChange={(e) => {
            setConfirmNewPassword(e.target.value);
          }}
          fullWidth
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
          disabled={
            !oldPassword ||
            !newPassword ||
            !confirmNewPassword ||
            newPassword !== confirmNewPassword
          }
          onClick={() => {
            if (
              newPassword &&
              confirmNewPassword &&
              newPassword === confirmNewPassword
            ) {
              changePasswordMutation({
                variables: {
                  oldPassword: oldPassword,
                  newPassword: newPassword,
                },
              });
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
