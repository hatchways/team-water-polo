import React from 'react';
import { Drawer, List, ListSubheader, ListItem, ListItemIcon, ListItemText, Icon } from '@material-ui/core';

type ReactCallback = (event: React.MouseEvent) => void;

interface Board {
  title: string;
  id: string;
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
          <ListSubheader component="div" id="board-selector-header">
            Select a Board
          </ListSubheader>
        }
      >
        {props.boards.map((board) => {
          return (
            <ListItem button onClick={props.onBoardSelect} key={board.id} data-board_id={board.id}>
              <ListItemIcon>
                <Icon>grid_view</Icon>
              </ListItemIcon>
              <ListItemText primary={board.title} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
