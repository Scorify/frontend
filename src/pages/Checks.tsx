import { useState } from "react";

import { Container, Box, Button, Typography } from "@mui/material";

import { useChecksQuery } from "../graph";
import CreateCheckModal from "../components/CreateCheckModal";
import { EditCheck } from "../components";

export default function Checks() {
  const { data, loading, error } = useChecksQuery();
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <CreateCheckModal open={open} setOpen={setOpen} data={data} />
      <Container component='main' maxWidth='md'>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component='h1' variant='h3' sx={{ marginBottom: "24px" }}>
            Checks
          </Typography>
          <Box marginBottom='24px'>
            <Button
              variant='contained'
              onClick={() => {
                setOpen(true);
              }}
            >
              Create Check
            </Button>
          </Box>

          {loading && (
            <Typography component='h1' variant='h5'>
              Loading...
            </Typography>
          )}
          {error && (
            <>
              <Typography component='h1' variant='h4'>
                Encountered Error
              </Typography>
              <Typography component='h1' variant='body1'>
                {error.message}
              </Typography>
            </>
          )}
          {data &&
            (!data.checks.length ? (
              <Typography component='h1' variant='h4'>
                No Checks Configured
              </Typography>
            ) : (
              <>
                {data.checks.map((check) => (
                  <EditCheck
                    key={check.name}
                    title={check.name}
                    expandedContent={
                      <Typography component='h1' variant='h4' key={check.name}>
                        {check.name}
                      </Typography>
                    }
                  />
                ))}
              </>
            ))}
        </Box>
      </Container>
    </Box>
  );
}
