import React from 'react';
import { FormControl, ListSubheader, MenuItem, InputLabel, Select } from '@mui/material';
import { Category } from '../types/Category.interface';

// const options = [];
// for (let group of properties) {
//     options.push(
//         <ListSubheader key={group.name}>{ group.name }</ListSubheader>
//     );
//     group.items.forEach(item => options.push(<MenuItem key={item.value} selected={item.value === this.state.property} value={item.value}>{item.label}</MenuItem>));
// }
// const { t } = this.props;
// const validationFailed = this.state.validated.find(item => item.key === 'property');
// return (
//     <InputLine>
//         <FormControl variant="outlined" style={{ minWidth: '300px' }} size="small">
//             <InputLabel id="property-type-label">{ t('property') }</InputLabel>
//             <Select
//                 labelId="property-type-label"
//                 value={this.state.property || ''}
//                 onChange={(e) => this.onPropertyChanged(e as any)}
//                 id="property-type"
//                 label={ t('property') }
//                 error={ validationFailed !== undefined}
//             >
//                 { options }
//             </Select>
//             { validationFailed ? (<FormHelperText error>{validationFailed.text}</FormHelperText>) : (<></>) }
//         </FormControl>
//     </InputLine>
// );

const properties = [
    {
        name: 'Residential',
        items: [
            { label: 'Condo', value: 'Condo' },
            { label: 'Detached House', value: 'Detached House' },
            { label: 'Townhouse', value: 'TownHouse' },
            { label: 'Townhome', value: 'Townhome' },
            { label: 'Twin House', value: 'Twin House' },
            { label: 'Home Office', value: 'HomeOffice' },
            { label: 'Apartment', value: 'Apartment' },
            { label: 'Dormitory', value: 'Dormitory' },
        ]
    },
    {
        name: 'Commercial',
        items: [
            { label: 'Commercial Building', value: 'CommercialBuilding' },
            { label: 'Office Building', value: 'OfficeBuilding' },
            { label: 'Shop Space', value: 'ShopSpace' },
            { label: 'Office Space', value: 'OfficeSpace' },
            { label: 'Land', value: 'Land' },
            { label: 'Hotel', value: 'Hotel' },
            { label: 'Resort', value: 'Resort' },
            { label: 'Bungalow', value: 'Bungalow' },
        ]
    },
    {
        name: 'Industrial',
        items: [
            { label: 'Factory', value: 'Factory' },
            { label: 'Warehouse', value: 'Warehouse' },
        ]
    }
];

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