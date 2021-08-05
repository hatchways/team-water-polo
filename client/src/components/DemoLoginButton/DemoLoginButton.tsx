import Button from '@material-ui/core/Button';
import login from '../../helpers/APICalls/login';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';

export default function DemoButton(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const demoLogin = async () => {
    const email = 'demo@demo.com';
    const password = 'test12345';
    const data = await login(email, password);
    if (data.success) {
      updateLoginContext(data.success);
    }
    if (data.error) {
      updateSnackBarMessage(data.error.message);
    }
  };
  return (
    <Button
      onClick={demoLogin}
      type="button"
      size="large"
      variant="contained"
      color="secondary"
      className={classes.demo}
    >
      Login as Demo
    </Button>
  );
}
