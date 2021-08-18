import { Card, CardContent, Typography, Grid, Button, IconButton, InputBase } from '@material-ui/core';
import { INewTask } from '../../../interface/Board';
import useStyles from '../useStyles';
import { useImmer } from 'use-immer';

// white, green, red, orange, blue, purple
const tagColors = ['#fff', '#5acd76', '#ff5d48', '#edab1d', '#59b0ff', '#d460f7'];
const initialState = { content: '', tag: '', error: false };

interface Props {
  addTask: (newTask: INewTask) => void;
  closeForm: () => void;
  columnId: string;
}

export default function NewTaskForm({ addTask, closeForm, columnId }: Props): JSX.Element {
  const classes = useStyles();

  const [form, updateForm] = useImmer(initialState);

  const updateContent = (content: string) => {
    updateForm((draft) => {
      draft.content = content;
    });
  };

  const updateTag = (tag: string) => {
    updateForm((draft) => {
      draft.tag = tag;
    });
  };

  const handleSubmit = () => {
    if (form.content) {
      addTask({
        content: form.content,
        tag: form.tag,
        columnId: columnId,
      });
      updateForm(initialState);
      closeForm();
    } else {
      updateForm((draft) => {
        draft.error = true;
      });
    }
  };

  return (
    <Grid>
      <Card className={classes.newTaskContainer}>
        <CardContent className={classes.inputContainer}>
          <InputBase
            required
            name="content"
            defaultValue="Add title..."
            onChange={(e) => updateContent(e.target.value)}
            className={classes.contentInput}
            error={form.error}
            fullWidth
            autoComplete="off"
          />
        </CardContent>
        <CardContent>
          <Grid container direction="row" justifyContent="space-between">
            <Typography variant="subtitle2">Select Tag:</Typography>
            <Grid item>
              {tagColors.map((color, index) => {
                const border = color === form.tag ? '2px solid #759CFC' : '2px solid #F4F6FF';
                return (
                  <IconButton
                    key={index}
                    onClick={() => updateTag(color)}
                    style={{
                      border: border,
                      backgroundColor: color,
                    }}
                    className={classes.tagButton}
                  ></IconButton>
                );
              })}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Grid item className={classes.columnFooter}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add a card
        </Button>
      </Grid>
    </Grid>
  );
}
