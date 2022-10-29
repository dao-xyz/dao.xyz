import { Container, FormControl, FormGroup, FormHelperText, Input, InputLabel, Paper, Slide, Snackbar, Theme, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { WalletNotConnectedError } from "@dao-xyz/wallet-adapter-base";
import { useWallet } from "@dao-xyz/wallet-adapter-react";
import React, { FC, useCallback, useState } from "react";

import LoadingButton from '@mui/lab/LoadingButton';
import { useUser } from '../../contexts/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { HOME } from '../../routes/routes';
import { ConditionalRedirect } from '../../components/navigation/ConditionalRedirect';
import { useAlert } from '../../contexts/AlertContext';

interface User {
    username: string
}


enum UserNameState {
    OK,
    EMPTY,
    NOT_UNIQUE,
    ILLEGAL_SYMBOLS
}
const userNameRegex = new RegExp('^[a-zA-Z0-9_]*$');
export const NewUser: FC = () => {

    const { publicKey } = useWallet();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const { user, createUser } = useUser();
    const [state, setState] = React.useState({
        username: ""
    } as User);
    const [usernameState, setUsernameState] = React.useState<UserNameState>(UserNameState.EMPTY);

    const { alert, alertError } = useAlert();




    const onClick = useCallback(async () => {
        if (!publicKey)
            throw new WalletNotConnectedError();
        setLoading(true)
        let success = false;
        try {
            await createUser(state.username);
            alert({
                severity: 'success',
                text: "Success!"
            });
            success = true;
            // navigate to redirect if exist, else to home

        }
        catch (error) {
            alertError(error);
        }
        setLoading(false)
        if (success) {
            /*  const redirect = getRedirect(location, network.config.type);
             if (redirect) {
                 navigate(redirect)
             }
             else  */
            {
                navigate(HOME);
            }
        }

    }, [publicKey, state]);


    const userExist = async (name: string): Promise<boolean> => {
        const user = false;/*  await getUserByName(name, connection); */
        return !!user;
    }

    const handleChange = (field: string) => (event: any) => {
        switch (field) {
            case 'username':
                {
                    const name: string = event.target.value.trim();
                    setState({ ...state, [field]: event.target.value });
                    if (name.match(userNameRegex)) {
                        setLoading(true)
                        userExist(name).then((exist) => {
                            if (exist) {
                                setUsernameState(UserNameState.NOT_UNIQUE);
                            }
                            else {
                                setUsernameState(UserNameState.OK);

                            }
                        }).finally(() => {
                            setLoading(false)
                        });
                    }
                    else {
                        setUsernameState(UserNameState.ILLEGAL_SYMBOLS)
                    }

                    break;
                }

            default:
                setState({ ...state, [field]: event.target.value });
        }

    };
    // Box sx={{ display: "flex", justifyContent: "center" }}
    return (
        <ConditionalRedirect validatePath={(_, __) => !user} to={"/" + HOME} >
            <Container maxWidth="xs" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography component="h1" variant="h3" gutterBottom>Create a user</Typography>
                <Typography component="h2" variant="h5" >Username</Typography>
                <Typography component="h2" gutterBottom>Must be alphanumeric. Underscores are also allowed.</Typography>
                <FormGroup sx={{ width: "100%", mb: 2 }}  >
                    <FormControl fullWidth margin="dense" required error={usernameState !== UserNameState.OK}>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input id="username" aria-describedby="name-help" onChange={handleChange("username")} />
                        <FormHelperText error={usernameState !== UserNameState.OK} id="name-help">{
                            {
                                [UserNameState.EMPTY]: 'Must be unique',
                                [UserNameState.NOT_UNIQUE]: 'Username is already taken!',
                                [UserNameState.ILLEGAL_SYMBOLS]: 'Usernames contains symbols that are not allowed',
                                [UserNameState.OK]: 'Great username'
                            }[usernameState]
                        }</FormHelperText>
                    </FormControl>
                </FormGroup>
                <Box sx={{ alignItems: "end", width: "100%" }} className="column" >
                    <Box sx={{
                        alignItems: "end"
                    }} className="column">
                        <LoadingButton loading={loading} onClick={onClick} disabled={!state.username || usernameState !== UserNameState.OK || !publicKey
                        } >
                            Create user
                        </LoadingButton>
                        {!publicKey && <FormHelperText error id="connect-wallet-help">Connect a wallet to create a user</FormHelperText>}

                        {/* <Send disabled={changingNetwork || (state.encrypted && (state.password != state.passwordConfirm || state.password.length == 0) || state.name.length == 0)} name={state.name} network={state.network}></Send> */}
                    </Box>
                </Box>
            </Container >
        </ConditionalRedirect>

    )
}