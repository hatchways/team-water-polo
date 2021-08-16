import { useState } from 'react';
import { theme } from '../../themes/theme';
import useStyles from './useStyles';
import { Box, Card, CardContent, Button, Typography, TextField, IconButton } from '@material-ui/core';
import { PermMediaOutlined, DescriptionOutlined, ControlPoint } from '@material-ui/icons';
import { IPropContent, IPropMethods } from '../../interface/Calendar';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

interface Props {
  content: IPropContent;
  methods: IPropMethods;
}

export default function CardModal({ content, methods }: Props): JSX.Element {
  const classes = useStyles(theme);
  const [title, setTitle] = useState(content.title);
  const [description, setDescription] = useState(content.description);
  const [showButton, setShowButton] = useState(false);

  const handleChange = (e: React.ChangeEvent) => {
    setDescription((e.target as HTMLInputElement).value);
  };

  const handleTitleChange = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setTitle(value);
  };

  const handleFocus = (): void => {
    setShowButton(true);
  };

  const saveDescription = (): void => {
    setShowButton(false);
    methods.updateEvent('description', description);
  };
  const cancelSave = (): void => {
    setShowButton(false);
    setDescription(content.description);
  };

  return (
    <Card className={classes.paper} variant="outlined">
      <CardContent>
        <Box className={classes.cardTitle}>
          <TextField
            id="outlined-basic"
            placeholder="Write Something"
            value={title}
            onChange={handleTitleChange}
            onBlur={() => methods.updateEvent('title', title)}
            multiline
            InputProps={{
              classes: {
                root: classes.notchedOutline,
                focused: classes.notchedOutline,
                notchedOutline: classes.notchedOutline,
              },
            }}
            variant="outlined"
          />
        </Box>
        <Typography className={classes.pos} color="textSecondary">
          In list<span>Completed</span>
        </Typography>
        <Box className={classes.header}>
          <DescriptionOutlined color="action" />
          <Typography className={classes.header} variant="h5" component="h3">
            Description
          </Typography>
        </Box>
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
        <Box className={classes.header}>
          <PermMediaOutlined color="action" />
          <Typography variant="h5" component="h3">
            Media
          </Typography>
          <Box>
            <input accept="image/*" id="upload-photo" type="file" multiple hidden />
            <label htmlFor="upload-photo">
              <Button component="span">
                <ControlPoint color="action" />
              </Button>
            </label>
          </Box>
        </Box>

        <Box className={classes.images}>
          {content.images.map((image: string, index: number) => {
            return (
              <div className={classes.imageContainer} key={index}>
                <img
                  className={classes.image}
                  src={`https://water-polo-hatchways.s3.ca-central-1.amazonaws.com/${image}`}
                  alt={content.title}
                />
                <IconButton aria-label="delete" className={classes.delete}>
                  <DeleteIcon fontSize="medium" />
                </IconButton>
              </div>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
