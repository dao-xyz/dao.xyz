import { Container, Grid, Typography } from '@mui/material';

import { FC, } from "react";

export const SettingsUser: FC = () => {
    return <Container maxWidth="xs" component="main" sx={{ pt: 5, pb: 10 }}>
        <Typography component="h3" variant="h3" gutterBottom>Settings</Typography>
        <Grid container spacing={2} wrap='nowrap' direction="column" >
            <Grid item>
                <Typography component="h4" variant="h4" gutterBottom>No settings exist</Typography>
            </Grid>
        </Grid>

    </Container >
}