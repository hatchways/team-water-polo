import { useState } from 'react';
import { theme } from '../../themes/theme';
import useStyles from './useStyles';
import { Box, Button, TextField, IconButton } from '@material-ui/core';
import { IPropMethods } from '../../interface/Calendar';
import CloseIcon from '@material-ui/icons/Close';

interface Props {
  cardDesc: string;
  methods: IPropMethods;
}

export default function ModalForm({ cardDesc, methods }: Props): JSX.Element {
  const classes = useStyles(theme);
  const [description, setDescription] = useState(cardDesc);
  const [showButton, setShowButton] = useState(false);

  const handleFocus = (): void => {
    setShowButton(true);
  };
  const handleChange = (e: React.ChangeEvent) => {
    setDescription((e.target as HTMLInputElement).value);
  };

  const saveDescription = (): void => {
    setShowButton(false);
    methods.updateEvent('description', description);
  };
  const cancelSave = (): void => {
    setShowButton(false);
    setDescription(cardDesc);
  };
  return (
    <form className={classes.form} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        onFocus={handleFocus}
        multiline
        placeholder="Add a more detailed description"
        variant="outlined"
        value={description}
        onChange={handleChange}
      />
      {showButton ? (
        <Box className={classes.buttonContainer}>
          <Button className={classes.button} variant="contained" color="primary" onClick={saveDescription}>
            Save
          </Button>
          <IconButton color="default" aria-label="close" component="span" onClick={cancelSave}>
            <CloseIcon />
          </IconButton>
        </Box>
      ) : null}
      <IconButton className={classes.closeButton} onClick={methods.handleClose}>
        <CloseIcon />
      </IconButton>
    </form>
  );
}
