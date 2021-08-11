import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
import { useEffect } from 'react';
import Avatar from '../../Images/68f55f7799df6c8078a874cfe0a61a5e6e9e1687.png';
import BrandingLogo from './BrandingLogo';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Board from '../../components/Board/Board';
import BoardSelector from '../../components/BoardSelector';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const [state, setState] = React.useState({
    board_selector_shown: false,
    boards: [
      {
        id: 'school',
        name: 'My School Board',
      },
      {
        id: 'personal',
        name: 'Personal Board',
      },
      {
        id: 'shopping',
        name: 'Shopping Lists & Purchases',
      },
      {
        id: 'business',
        name: 'Business Ideas',
      },
    ],
    current_board: 'school',
  });

  const toggleBoardSelector = (event: React.MouseEvent) => {
    setState((prevState) => {
      const board_selector_shown = !prevState.board_selector_shown;
      return Object.assign({}, prevState, { board_selector_shown });
    });
  };

  const selectBoard = (event: React.MouseEvent) => {
    let board_button = event.target as HTMLElement;
    let board_id = board_button.dataset.board_id;
    while (typeof board_id === 'undefined') {
      board_button = board_button.parentNode as HTMLElement;
      board_id = board_button.dataset.board_id;
    }

    setState((prevState) => {
      return Object.assign({}, prevState, {
        current_board: board_id,
        board_selector_shown: !prevState.board_selector_shown,
      });
    });
  };

  const getCurrentBoardName = () => {
    const current_board_id = state.current_board;
    const current_board = state.boards.filter((board) => {
      return board.id === current_board_id;
    })[0];
    return current_board.name;
  };

  //const { loggedInUser } = useAuth();
  //const { initSocket } = useSocket();

  //const history = useHistory();

  // useEffect(() => {
  //   initSocket();
  // }, [initSocket]);

  // if (loggedInUser === undefined) return <CircularProgress />;
  // if (!loggedInUser) {
  //   history.push('/login');
  //   // loading for a split seconds until history.push works
  //   return <CircularProgress />;
  // }

  // return (
  //   <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
  //     <CssBaseline />
  //     <Grid item className={classes.drawerWrapper}>
  //       <ChatSideBanner loggedInUser={loggedInUser} />
  //     </Grid>
  //   </Grid>
  // );

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
        <Button className="create-board" startIcon={<Icon>add</Icon>} variant="contained" color="primary">
          Create Board
        </Button>
        <IconButton className="user-button">
          <img src={Avatar} alt="avatar" />
        </IconButton>
      </Grid>
      <Grid container item xs={12} component="main" className="main">
        <Grid container item xs={12} className="main--header">
          <Grid item xs={6} component="h1">
            {getCurrentBoardName()}
          </Grid>
          <IconButton onClick={toggleBoardSelector}>
            <Icon>dashboard</Icon>
          </IconButton>
        </Grid>
        <BoardSelector
          open={state.board_selector_shown}
          onClose={toggleBoardSelector}
          boards={state.boards}
          onBoardSelect={selectBoard}
        />
      </Grid>
      <Board />
    </Grid>
  );
}
