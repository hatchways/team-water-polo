import { Grid, CssBaseline, Button, IconButton, Icon, Link } from '@material-ui/core';
import useStyles from './useStyles';
import { useBoard } from '../../context/useBoardContext';
import Avatar from '../../Images/68f55f7799df6c8078a874cfe0a61a5e6e9e1687.png';
import BrandingLogo from './BrandingLogo';
import Board from '../../components/Board/Board';
import MainModal from '../../components/Board/Modals/MainModal';
import { useState } from 'react';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { state, dispatch, createNewBoard } = useBoard();

  const toggleModal = () => {
    setOpen((open) => !open);
  };

  return (
    <Grid container direction="column" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      <Grid
        container
        item
        xs={12}
        component="header"
        className="dashboard--header"
        justifyContent="space-between"
        alignItems="center"
        wrap="nowrap"
      >
        <Grid container item xs={3} alignItems="center" className={classes.branding} justifyContent="flex-start">
          <BrandingLogo />
          <div className="branding--name">Kanban</div>
        </Grid>
        <Grid container item xs={6} component="nav" className="dashboard--header--nav" justifyContent="center">
          <Button startIcon={<Icon>space_dashboard</Icon>} className="nav--item active" color="primary">
            Dashboard
          </Button>
          <Button startIcon={<Icon>calendar_today</Icon>} className="nav--item">
            Calendar
          </Button>
        </Grid>
        <Button
          className="create-board"
          startIcon={<Icon>add</Icon>}
          onClick={toggleModal}
          variant="contained"
          color="primary"
        >
          Create Board
        </Button>
        <IconButton className="user-button">
          <img src={Avatar} alt="avatar" />
        </IconButton>
      </Grid>
      <Grid container item xs={12} component="main">
        <Grid container item xs={12} className="main--header">
          <Grid item xs={6} component="h1">
            {state && state.title}
          </Grid>
          <Icon>menu</Icon>
        </Grid>
      </Grid>
      <MainModal isOpen={open} closeModal={toggleModal} submitForm={createNewBoard} kind={'board'} />
      {state?.id ? (
        <Board state={state} dispatch={dispatch} />
      ) : (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '70vh' }}>
          <Link component="button" variant="h6" color="primary" onClick={toggleModal}>
            Get started by creating a new board
          </Link>
        </Grid>
      )}
    </Grid>
  );
}
