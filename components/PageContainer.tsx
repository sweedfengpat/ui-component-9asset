import { styled, Paper } from '@mui/material'


export const PageContainer = styled(Paper)(({ theme }) => ({

    minHeight: '200px',
    marginTop: '5px',
    marginBottom: '40px',
    padding: '10px 15px !important',

    [theme.breakpoints.up('sm')]: {
        minHeight: '200px',
        marginTop: '20px',
        marginBottom: '40px',
        padding: '20px !important',
    }
}));

export default PageContainer;