import { useState, useEffect } from 'react';
import { theme } from '../../themes/theme';
import useStyles from './useStyles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { PermMediaOutlined, DescriptionOutlined } from '@material-ui/icons';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';

export default function CardModal({ content, methods }: any): JSX.Element {
  const [title, setTitle] = useState(content.title);
  const [description, setDescription] = useState(content.description);
  const [showButton, setShowButton] = useState(false);
  const classes = useStyles(theme);
  const handleChange = (event: any) => {
    setDescription(event.target.value);
  };

  useEffect(() => {
    setTitle(content.title);
  }, [content.title]);

  const handleTitleChange = (event: any) => {
    const value = event.target.value;
    setTitle(value);
  };
  const handleFocus = (event: any) => {
    setShowButton(true);
    console.log('focused');
  };

  const saveDescription = () => {
    setShowButton(false);
    methods.updateEvent('description', description);
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
          In column <span>Completed</span>
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
            onBlur={saveDescription}
            multiline
            placeholder="Add a more detailed description"
            variant="outlined"
            value={description}
            onChange={handleChange}
          />
          {showButton ? (
            <Button className={classes.button} variant="contained" color="primary" onClick={saveDescription}>
              Save
            </Button>
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
        </Box>

        <div className={classes.imageContainer}>
          <CardMedia
            component="img"
            className={classes.media}
            image={`https://water-polo-hatchways.s3.ca-central-1.amazonaws.com/068d7488e6ece71c8a2feefaefdd1412`}
            title="Contemplative Reptile"
          />
          <CardMedia
            component="img"
            className={classes.media}
            image={`https://water-polo-hatchways.s3.ca-central-1.amazonaws.com/068d7488e6ece71c8a2feefaefdd1412`}
            title="Contemplative Reptile"
          />
        </div>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
