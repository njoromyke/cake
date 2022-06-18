import { FormControl, FormHelperText, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

const InputComponent = ({ label, type, ...otherProps }) => {
  const { setFieldTouched, errors, touched, setFieldValue, values, disabled } =
    useFormikContext();
  return (
    <FormControl fullWidth>
      <TextField
        id={label}
        onBlur={() => setFieldTouched(label, true)}
        label={label}
        type={type}
        fullWidth
        disabled={disabled}
        margin="normal"
        variant="outlined"
        error={touched[label] && !!errors[label]}
        value={values[label]}
        helperText={touched[label] && errors[label] ? errors[label] : null}
        onChange={(e) => setFieldValue(label, e.target.value)}
        {...otherProps}
      />
    </FormControl>
  );
};

export default InputComponent;
