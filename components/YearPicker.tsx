import { ArrowDropUp, CalendarTodayOutlined, CloseOutlined } from "@mui/icons-material";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import React from "react";

export interface YearPickerProps {
    label: string;
}

export interface YearPickerState {
    open: boolean;
    value: { label: string, value: string } | null;
}

export class YearPicker extends React.Component<YearPickerProps, YearPickerState> {

    options: { label: string, value: string }[] = [];
    
    constructor (props: YearPickerProps | Readonly<YearPickerProps>) {
        super(props);
        this.createOptions();
        this.state = {
            open: false,
            value: null
        }
    }

    createOptions = () => {
        this.options = [];
        const currentYear = (new Date()).getFullYear();
        for(let i = 0; i < 50; i++) {
            this.options.push({ label: `${currentYear-i}`, value: `${currentYear-i}` })
        }
    }

    render(): React.ReactNode {
        return (
        <Autocomplete
            renderInput={(params: any) => 
                <TextField
                    {...params}
                    label={this.props.label}
                    variant="outlined"
                    size="small"
                    fullWidth
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
            disablePortal
            options={this.options}
            sx={{ display: 'inline-block', width: '300px'}}
            onOpen={() => this.setState({ open: true })}
            onClose={() => this.setState({ open: false })}
            value={this.state.value}
            onChange={(e, v) => this.setState({ value: v })}
        />
        );
    }
}