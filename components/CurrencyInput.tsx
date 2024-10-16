import React, { useState } from 'react';
import { BaseTextFieldProps, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import NumberFormat, { NumberFormatValues } from "react-number-format";

export interface CurrencyInputProps extends BaseTextFieldProps {
    unit?: string;
    dataValidateKey?: string; 
    decimalScale?: number; 
    minValue?: number;
    maxValue?: number;
    updateValue?: (event: any, index: number) => void;
    index?: number;
}

export const CurrencyInput = (props: CurrencyInputProps & TextFieldProps) => {

    const [value, setValue] = useState<string | number | any>(props.value || '');
    const [error, setError] = useState<string | null>(null);

    const handleValueChange = (values: { value: string }) => {
        setValue(values.value);
        if (props.onChange) {
            props.onChange({
                ...values,
                target: {
                    ...values,
                    value: values.value,
                },
            } as any);
        }
    };

    const handleBlur = () => {
        let updatedValue = Number(value);
        let errorMessage: string | null = null;

        if (props.minValue !== undefined && updatedValue < props.minValue) {
            updatedValue = props.minValue;
            errorMessage = `Value must be at least ${props.minValue}`;
        }

        if (props.maxValue !== undefined && updatedValue > props.maxValue) {
            updatedValue = props.maxValue;
            errorMessage = `Value must be at most ${props.maxValue}`;
        }

        setValue(updatedValue);
        setError(errorMessage);
        if(errorMessage  && props.updateValue && typeof props.index === 'number') {            
            props.updateValue({target: {name:props.name, value:''}}, +props.index); // Call updateValue with event and index
        }
    };

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
        decimalScale={props?.decimalScale || 0 }
        value={props.value as any || ''}
        onChange={props.onChange}
        onValueChange={handleValueChange}
        onBlur={handleBlur}
        error={!!error}
        helperText={error}
    />
    );
}