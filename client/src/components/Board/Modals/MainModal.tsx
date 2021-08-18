import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react';
import useStyles from './useStyles';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  submitForm: (title: string) => void;
  kind: string;
}

export default function MainModal({ isOpen, closeModal, submitForm, kind }: Props): JSX.Element {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      setError('');
      submitForm(title);
      closeModal();
    } else {
      setError('Please enter a valid title');
    }
  };

  return (
    <Dialog open={isOpen} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth>
      <Grid container justifyContent="flex-end">
        <IconButton onClick={closeModal} className={classes.closeButton}>
          <CloseIcon className={classes.icon} />
        </IconButton>
      </Grid>
      <Grid container direction="column" alignItems="center">
        <DialogTitle id="form-dialog-title" disableTypography={true}>
          <Typography variant="h4">
            <strong>Create a new {kind}</strong>
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.input}>
          <TextField
            autoFocus
            id="title"
            type="text"
            defaultValue="Add Title"
            variant="outlined"
            error={error !== ''}
            helperText={error}
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions className={classes.createButton}>
          <Button color="primary" variant="contained" size="large" onClick={handleSubmit} fullWidth>
            Create
          </Button>
        </DialogActions>
      </Grid>
    </Dialog>
  );
}
