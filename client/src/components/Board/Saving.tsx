import { Grid, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

interface Props {
  isSaving: boolean;
}

export default function Saving(isSaving: Props): JSX.Element {
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
