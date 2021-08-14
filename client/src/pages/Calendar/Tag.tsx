import { Typography, CardContent, Card, Box } from '@material-ui/core';
import { theme } from '../../themes/theme';
import useStyles from './useStyles';
export default function Tag({ event }: any): JSX.Element {
  const classes = useStyles(theme);
  return (
    <Card>
      <CardContent></CardContent>
      <Box className={classes.tag} style={{ backgroundColor: event.tag ?? 'white' }}></Box>
      {/* <span style={{ backgroundColor: event.tag }} className={classes.tag}></span> */}
      <Typography className={classes.title}>{event.title}</Typography>
    </Card>
  );
}
