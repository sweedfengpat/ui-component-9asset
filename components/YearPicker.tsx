import { Autocomplete, TextField } from "@mui/material";
import React from "react";

export interface YearPickerProps  {
    label: string;
    name: string;
    value: { value?: string, label?: string };
    onChange?: (value: { value?: string, label?: string } | null) => void;
    
    error?: boolean | undefined;
    helperText?: React.ReactNode
}

export interface YearPickerState {
    open: boolean;
    value: { label?: string, value?: string } | null;

    onChange?: ( value: { label?: string, value?: string } | null) => void;
}

export class YearPicker extends React.Component<YearPickerProps, YearPickerState> {

    options: { label: string, value: string }[] = [];
    
    constructor (props: YearPickerProps | Readonly<YearPickerProps>) {
        super(props);
        this.createOptions();
        this.state = {
            open: false,
            value: this.props.value || null,
        }
    }

    createOptions = () => {
        this.options = [];
        const currentYear = (new Date()).getFullYear();
        for(let i = 0; i < 50; i++) {
            this.options.push({ label: `${currentYear-i}`, value: `${currentYear-i}` })
        }
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
            renderInput={(params: any) => 
                <TextField
                    {...params}
                    name={this.props.name}
                    label={this.props.label}
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={this.props.error}
                    helperText={this.props.helperText}
                    // InputProps={{
                    //     ...params.InputProps,
                    //     endAdornment: (<>
                    //         <InputAdornment position="end">
                    //             { this.state.value ? <CloseOutlined /> : <></> }
                    //             { this.state.open ? <ArrowDropUp /> : <CalendarTodayOutlined /> }
                    //         </InputAdornment>
                    //     </>),
                    // }}
                />
            }
            fullWidth
            disablePortal
            options={this.options}
            sx={{ display: 'inline-block' }}
            onOpen={() => this.setState({ open: true })}
            onClose={() => this.setState({ open: false })}
            // value={this.state.value?.value || ''}
            inputValue={this.state.value?.value || ''}
            onChange={(e, v) => this.onSelectChanged(v)}
        />
        );
    }
}