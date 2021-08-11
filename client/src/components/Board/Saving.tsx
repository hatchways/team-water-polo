import { Grid, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default function Saving({ isSaving: isSaving }: { isSaving: boolean }): JSX.Element {
  return (
    <Grid container justifyContent="flex-start" alignItems="center" style={{ marginLeft: '8px' }}>
      {isSaving ? (
        <Typography variant="subtitle1">Saving...</Typography>
      ) : (
        <>
          <Typography color="primary" variant="subtitle1">
            Saved
          </Typography>
          <CheckCircleIcon color="primary" />
        </>
      )}
    </Grid>
  );
}
