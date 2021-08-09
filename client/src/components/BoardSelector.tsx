import Drawer from '@material-ui/core/Drawer';

type ReactCallback = (event: React.MouseEvent) => void;

export default function BoardSelector(props: { open: boolean; onClose: ReactCallback }): JSX.Element {
  return (
    <Drawer anchor="right" open={props.open} onClose={props.onClose}>
      <ul>
        <li>
          <a href="#">My School Board</a>
        </li>
        <li>
          <a href="#">Personal</a>
        </li>
        <li>
          <a href="#">Shopping</a>
        </li>
        <li>
          <a href="#">Business Ideas</a>
        </li>
      </ul>
    </Drawer>
  );
}
