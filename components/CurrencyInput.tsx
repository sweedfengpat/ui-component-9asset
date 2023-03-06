import { BaseTextFieldProps, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import NumberFormat from "react-number-format";

export interface CurrencyInputProps extends BaseTextFieldProps {
    unit?: string;
}

export const CurrencyInput = (props: CurrencyInputProps & TextFieldProps) => {

    return (
    <NumberFormat
        fullWidth={ (props as TextFieldProps).fullWidth }
        id={props.id}
        name={props.name}
        label={props.label}
        disabled={props.disabled}
        customInput={TextField}
        variant="outlined"
        size="small"
        inputProps={{
            style: { textAlign: 'right' },
            inputMode: 'numeric',
            pattern: '[0-9]*'
        }}
        InputProps={{
            endAdornment: props.unit ? <InputAdornment position="end">{ props.unit || 'THB' }</InputAdornment> : undefined
        }}
        sx={props.sx}
        thousandSeparator={true}
        value={props.value as any || ''}
        onChange={props.onChange}
    />
    );
}