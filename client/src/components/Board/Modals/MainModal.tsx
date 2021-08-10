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
  isColumn: boolean;
  closeModal: () => void;
  addColumn: (newTask: string) => void;
}

// this is set up to work with both the new column and 'create board' buttons
export default function MainModal({ isOpen, isColumn, closeModal, addColumn }: Props): JSX.Element {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      setError('');
      addColumn(title);
      closeModal();
    } else {
      setError('Please enter a valid title');
    }
  };

  return (
    <Dialog open={isOpen} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth>
      <Grid container justifyContent="flex-end">
        <IconButton onClick={closeModal} className={classes.closeBtn}>
          <CloseIcon className={classes.icon} />
        </IconButton>
      </Grid>
      <Grid container direction="column" alignItems="center">
        <DialogTitle id="form-dialog-title" disableTypography={true}>
          <Typography variant="h4">
            <strong>Create a new {isColumn ? 'column' : 'board'}</strong>
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
        <DialogActions className={classes.createBtn}>
          <Button color="primary" variant="contained" size="large" onClick={handleSubmit} fullWidth>
            Create
          </Button>
        </DialogActions>
      </Grid>
    </Dialog>
  );
}
