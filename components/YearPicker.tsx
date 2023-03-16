import { Autocomplete, AutocompleteRenderInputParams, InputBaseComponentProps, TextField } from "@mui/material";
import React from "react";

export interface YearPickerProps  {
    label: string;
    name: string;
    value: { value: string, label: string } | null;
    required?: boolean;
    onChange?: (value: { value?: string, label?: string } | null) => void;
    
    error?: boolean | undefined;
    helperText?: React.ReactNode;

    inputProps?: InputBaseComponentProps | undefined;
}

export interface YearPickerState {
    open: boolean;
    value: { label: string, value: string } | null;
    inputValue: string | null;

    options: { label: string, value: string }[];

    onChange?: ( value: { label?: string, value?: string } | null) => void;
}

export class YearPicker extends React.Component<YearPickerProps, YearPickerState> {

    constructor (props: YearPickerProps | Readonly<YearPickerProps>) {
        super(props);
        this.state = {
            options: this.createOptions(),
            open: false,
            value: this.props.value || null,
            inputValue: this.props?.value?.value || null
        }
    }

    componentDidMount(): void {
        this.setState({ inputValue: this.props?.value?.value || null });
    }

    createOptions = () => {
        const options = [];
        const currentYear = (new Date()).getFullYear();
        for(let i = 0; i < 50; i++) {
            options.push({ label: `${currentYear-i}`, value: `${currentYear-i}` })
        }
        return options;
    }

    onSelectChanged = (value: { value?: string, label?: string } | null) => {
        this.setState({ value: value as   { label: string, value: string } | null });
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    render(): React.ReactNode {
        return (
        <Autocomplete
            disablePortal
            renderInput={(params: AutocompleteRenderInputParams) => {
                return (
                <TextField
                    {...params}
                    name={this.props.name}
                    label={this.props.label}
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={this.props.error}
                    helperText={this.props.helperText}
                    required={this.props.required}

                    inputProps={{ ...params.inputProps, ...this.props.inputProps}}
                />)
            }}
            
            options={this.state.options}
            getOptionLabel={(option) => option.label}

            isOptionEqualToValue={(option, value) => {
                return value && option.value === value.value;
            }}

            inputValue={this.state.inputValue || ''}
            onInputChange={(event, newInputValue) => {
                this.setState({ inputValue: newInputValue });
            }}

            value={this.state.value || null}
            onChange={(e, v) => this.onSelectChanged(v)}
        />
        );
    }
}