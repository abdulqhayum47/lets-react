import React from "react";
import { TextField } from "@mui/material";

export default function Input(props) {
    const { name, label, value, type, error=null, onChange } = props;
    return(
        <TextField 
            variant="outlined"
            label={label}
            name={name}
            value={value || ""}
            onChange={onChange}
            type={type}
            {...(error && {error:true,helperText:error})}
        />
    )
}