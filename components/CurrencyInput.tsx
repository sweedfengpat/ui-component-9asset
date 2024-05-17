import { BaseTextFieldProps, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import NumberFormat from "react-number-format";

export interface CurrencyInputProps extends BaseTextFieldProps {
    unit?: string;
    dataValidateKey?: string; 
    decimalScale?: number; 
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
            'data-validate-key': props.dataValidateKey
            // inputMode: 'numeric',
            // pattern: '[0-9]*'
        }}
        InputProps={{
            endAdornment: props.unit ? <InputAdornment position="end">{ props.unit || 'THB' }</InputAdornment> : undefined
        }}
        sx={props.sx}
        thousandSeparator={true}
        allowNegative={false}
        allowLeadingZeros={false}
        decimalScale={props?.decimalScale || 0}
        value={props.value as any || ''}
        onChange={props.onChange}
    />
    );
}