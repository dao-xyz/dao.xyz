import * as React from 'react';
/* import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { NetworkContext } from '../../contexts/Network';
import { useLocation, useParams, useNavigate } from 'react-router';
import { ALL_CONFIGS, getNetworkConfigFromPathParam, getPathForNetwork, NetworkXYZ } from '../../utils/network';
 */
export const SelectNetwork = (props: { toggle?: boolean }) => {
    /* let { pathname } = useLocation();
    let navigator = useNavigate();

    const { config, changeNetwork } = React.useContext(NetworkContext);
    const handleChange = (event: SelectChangeEvent<NetworkXYZ>) => {
        // changeNetwork(event.target.value as WalletAdapterNetwork)
        // Navigate and force reload
        switch (event.target.value) {
            case NetworkXYZ.Mainnet.toString():
                return changeNetwork(NetworkXYZ.Mainnet, pathname)
            case NetworkXYZ.Testnet.toString():
                return changeNetwork(NetworkXYZ.Testnet, pathname)
            case NetworkXYZ.Devnet.toString():
                return changeNetwork(NetworkXYZ.Devnet, pathname)
            default:
                throw new Error("Unsupported network: " + event.target.value)
        }

    }
    return (

        <FormControl size="small" >
            <Select
                labelId="network-label"
                id="network-select"
                value={config?.type}
                onChange={handleChange}
            >
                {ALL_CONFIGS.map(config => (<MenuItem key={config.name} value={config.type}>{config.name}</MenuItem>))}

            </Select>
        </FormControl >
    ) */
    return <></>
}