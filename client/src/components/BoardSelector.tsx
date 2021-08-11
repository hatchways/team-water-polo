import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubHeader from '@material-ui/core/ListSubheader';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

type ReactCallback = (event: React.MouseEvent) => void;
type ReactBoardSelection = (board_id: string) => void;

interface Board {
  id: string;
  name: string;
}

interface Props {
  open: boolean;
  onClose: ReactCallback;
  boards: Array<Board>;
  onBoardSelect: ReactCallback;
}

export default function BoardSelector(props: Props): JSX.Element {
  return (
    <Drawer className="board-selector" anchor="right" open={props.open} onClose={props.onClose} variant="persistent">
      <List
        component="nav"
        subheader={
          <ListSubHeader component="div" id="board-selector-header">
            Select a Board
          </ListSubHeader>
        }
      >
        {props.boards.map((board) => {
          return (
            <ListItem button onClick={props.onBoardSelect} key={board.id} data-board_id={board.id}>
              <ListItemIcon>
                <Icon>grid_view</Icon>
              </ListItemIcon>
              <ListItemText primary={board.name} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
