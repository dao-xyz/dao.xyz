import { ChildCare, RocketLaunch, Send } from "@mui/icons-material";
import { Button, Card, CardContent, Container, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";

import React, { FC, useCallback, useContext, useEffect, useState } from "react";


export const PostsFilter: FC = () => {
    return <Card raised elevation={2} >
        <CardContent sx={{ pb: 2 }}>
            <Grid container spacing={1}>
                <Grid item>
                    <Button variant="outlined" startIcon={<RocketLaunch />}>
                        Trending
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" startIcon={<ChildCare />}>
                        New
                    </Button>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
}