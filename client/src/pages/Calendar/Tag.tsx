import { theme } from '../../themes/theme';
import useStyles from './useStyles';
import { Typography, CardContent, Card, Box } from '@material-ui/core';

export default function Tag({ event }: any): JSX.Element {
  const classes = useStyles(theme);

  return (
    <Card>
      <CardContent className={classes.cardContent}>
        <Box className={classes.tag} style={{ backgroundColor: event.tag ?? '#fff' }}></Box>
        <Typography noWrap className={classes.title}>
          {event.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
