import { Box, Paper, TextField, Divider } from "@mui/material";

import { InjectsQuery } from "../../graph";

type props = {
  elevation?: number;
  inject: InjectsQuery["injects"][0];
};

export default function Rubric({ elevation = 1, inject }: props) {
  const sortedSubmissions = inject.submissions
    .filter((submission) => submission.graded)
    .sort(
      (submissionA, submissionB) =>
        (submissionB.rubric?.fields.reduce(
          (acc, field) => acc + field.score,
          0
        ) ?? 0) -
        (submissionA.rubric?.fields.reduce(
          (acc, field) => acc + field.score,
          0
        ) ?? 0)
    );

  return (
    <Paper
      elevation={elevation}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
        marginTop: "8px",
        marginBottom: "24px",
      }}
    >
      {inject.rubric.fields.length && (
        <Box display='flex' flexDirection='column' gap='8px' width='100%'>
          {inject.rubric.fields.map((field) => (
            <Paper
              key={field.name}
              elevation={elevation + 1}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px",
                width: "100%",
                marginBottom: "4px",
                gap: "16px",
              }}
            >
              <TextField
                size='small'
                label='Criteria'
                value={field.name}
                fullWidth={sortedSubmissions.length == 0}
              />
              {sortedSubmissions.length > 0 && (
                <>
                  <TextField
                    size='small'
                    label='Notes'
                    value={
                      sortedSubmissions[0].rubric?.fields.find(
                        (f) => f.name === field.name
                      )?.notes
                    }
                    fullWidth
                  />
                  <TextField
                    size='small'
                    label='Score'
                    value={
                      sortedSubmissions[0].rubric?.fields.find(
                        (f) => f.name === field.name
                      )?.score
                    }
                  />
                </>
              )}
              <TextField
                size='small'
                label='Max Points'
                value={field.max_score}
              />
            </Paper>
          ))}
          {sortedSubmissions.length > 0 && (
            <>
              <Divider sx={{ marginBottom: "12px" }} />
              <TextField
                size='small'
                label='Notes'
                value={sortedSubmissions[0].rubric?.notes}
                fullWidth
              />
            </>
          )}
          <Box display='flex' flexDirection='row' gap='8px' marginTop='8px'>
            {sortedSubmissions.length > 0 && (
              <TextField
                size='small'
                label='Total Score'
                value={sortedSubmissions[0].rubric?.fields.reduce(
                  (acc, field) => acc + field.score,
                  0
                )}
                fullWidth
              />
            )}
            <TextField
              size='small'
              label='Max Score'
              value={inject.rubric.max_score}
              fullWidth
            />
          </Box>
        </Box>
      )}
    </Paper>
  );
}
