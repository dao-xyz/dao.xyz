import { ContentCopy } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { PublicSignKey } from "@dao-xyz/peerbit-crypto";
import * as React from "react";
import { usePublicKeyToCopy } from '../../utils/keys';

const PublickeyText: React.FC<{ publicKey: PublicSignKey }> = ({ publicKey }) => {

    const {
        base58,
        copyAddress,
        content
    } = usePublicKeyToCopy(publicKey, (_: boolean) => { });

    return (
        <Button endIcon={<ContentCopy />} variant="text" onClick={copyAddress}>
            <Typography>
                {content}
            </Typography>
        </Button>
    )
};

export default PublickeyText;