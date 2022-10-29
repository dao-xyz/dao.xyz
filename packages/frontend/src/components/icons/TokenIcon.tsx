import { Avatar, Box, BoxProps } from '@mui/material';
import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import logo from "./../../logo.png";

const userNameRegex = new RegExp('^[a-zA-Z0-9_]*$');
export const TokenIcon: FC<BoxProps> = (props: BoxProps) => {
    return <Box {...props}>
        X
        {/* <Avatar sx={{ width: 24, height: 24 }} alt="dao-xyz" src={logo} /> */}
    </Box>

}