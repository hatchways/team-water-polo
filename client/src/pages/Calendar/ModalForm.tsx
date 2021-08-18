import { useState } from 'react';
import { theme } from '../../themes/theme';
import useStyles from './useStyles';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, IconButton } from '@material-ui/core';
import { IPropMethods } from '../../interface/Calendar';
import CloseIcon from '@material-ui/icons/Close';

interface Props {
  cardDesc: string;
  methods: IPropMethods;
}

export default function ModalForm({ cardDesc, methods }: Props): JSX.Element {
  const classes = useStyles(theme);
  const [reset, setReset] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const handleFocus = (): void => {
    setReset(false);
    setShowButton(true);
  };

  const cancelSave = (): void => {
    setReset(true);
    setShowButton(false);
  };

  const onSubmit = (values: { text: string }) => {
    const { text } = values;
    setShowButton(false);
    methods.updateEvent('description', text);
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          text: cardDesc,
        }}
        validationSchema={Yup.object().shape({
          text: Yup.string().max(200, 'Description is too long'),
        })}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, touched, errors }) => (
          <Form className={classes.form}>
            <TextField
              id="text"
              name="text"
              placeholder="Add a more detailed description"
              onChange={handleChange}
              value={!reset ? values.text : cardDesc}
              onFocus={handleFocus}
              multiline
              variant="outlined"
              helperText={touched.text ? errors.text : ''}
              error={touched.text && Boolean(errors.text)}
            />
            {showButton ? (
              <Box className={classes.buttonContainer}>
                <Button type="submit" className={classes.button} variant="contained" color="primary">
                  Save
                </Button>
                <IconButton color="default" aria-label="close" component="span" onClick={cancelSave}>
                  <CloseIcon />
                </IconButton>
              </Box>
            ) : null}
          </Form>
        )}
      </Formik>
    </div>
  );
}
