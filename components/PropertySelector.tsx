import React from 'react';
import { FormControl, MenuItem, InputLabel, Select } from '@mui/material';
import { Category } from '../Types/Category.interface';

export interface PropertySelectorProps {
    selected: number | undefined;
    items: Category[];
    onPropertyChanged?: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

export class PropertySelector extends React.Component<PropertySelectorProps, any> {

    onPropertyChanged = (event: React.ChangeEvent<{ value: unknown }>) => {
        if (this.props.onPropertyChanged) {
            this.props.onPropertyChanged(event);
        }
    }

    render () {
        
        const categories = this.props.items;
        const options = categories.sort((a, b) => a.category_Sort = b.category_Sort)
                                  .map(cate => <MenuItem key={cate.category_ID} selected={cate.category_ID === this.props.selected} value={cate.category_ID}>{cate.category_Name_EN}</MenuItem>);
        // const { t } = this.props;
        // const validationFailed = this.state.validated.find(item => item.key === 'property');
        return (
            <FormControl variant="outlined" style={{ maxWidth: '300px' }} size="small" fullWidth>
                <InputLabel id="property-type-label">Property</InputLabel>
                <Select
                    labelId="property-type-label"
                    value={this.props.selected || ''}
                    onChange={(e) => this.onPropertyChanged(e as any)}
                    id="property-type"
                    label={'Property'}
                    // error={ validationFailed !== undefined}
                >
                    { options }
                </Select>
                {
                    /* { validationFailed ? (<FormHelperText error>{validationFailed.text}</FormHelperText>) : (<></>) } */
                }
            </FormControl>
        );
    }
}

export default PropertySelector;