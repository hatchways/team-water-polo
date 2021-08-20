import { Typography, CardContent, Card, Box } from '@material-ui/core';
import useStyles from './useStyles';
import { Draggable } from 'react-beautiful-dnd';
import { IPropCard } from '../../interface/Board';

interface Props {
  card: IPropCard;
  index: number;
}

export default function Task({ card, index }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Draggable draggableId={card._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={classes.cardContainer}
        >
          <Card className={snapshot.isDragging ? classes.draggingCard : undefined}>
            <CardContent>
              <Box className={classes.tag} style={{ backgroundColor: card.tag ?? 'white' }}></Box>
              <Typography variant="h6" className={classes.cardContent}>
                <strong>{card.title}</strong>
              </Typography>
              <Typography variant="subtitle2">
                {card.date?.toLocaleDateString('en-us', { month: 'long', day: '2-digit' }) ?? ''}
              </Typography>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
}
