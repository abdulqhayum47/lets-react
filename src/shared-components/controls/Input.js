import React from "react";
import { TextField } from "@mui/material";

export default function Input(props) {
  const { name, label, variant, value, type, error=null, onChange, InputProps } = props;
  return(
    <TextField 
      variant={variant}
      label={label}
      name={name}
      value={value || ""}
      onChange={onChange}
      type={type}
      InputProps={InputProps}
      {...(error && {error:true,helperText:error})}
    />
  );
}