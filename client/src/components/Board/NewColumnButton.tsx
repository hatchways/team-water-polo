import useStyles from './useStyles';
import { Grid, IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { ReactNode } from 'react';
import { useState } from 'react';

interface ComponentProps {
  children: ReactNode;
  setHover: (arg: boolean) => void;
}

const HoverableZone = function ({ children, setHover }: ComponentProps) {
  const classes = useStyles();
  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      className={classes.hoverableZone}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Grid>
  );
};

interface Props {
  toggleModal: () => void;
  setColumnSide: (side: string) => void;
  side: string;
}

export default function NewColumnButton({ toggleModal, setColumnSide, side }: Props): JSX.Element {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const handleClick = () => {
    setColumnSide(side);
    toggleModal();
  };
  return (
    <HoverableZone setHover={setHover}>
      {hover && (
        <IconButton onClick={handleClick} className={classes.addColumnBtn}>
          <AddCircleOutlineIcon className={classes.icon} />
        </IconButton>
      )}
    </HoverableZone>
  );
}
