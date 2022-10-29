
import { FC } from "react";
import { usePosts } from "../../contexts/PostContext";
import { Breadcrumbs } from "@mui/material";
import Link from '@mui/material/Link';
import { Box } from "@mui/system";

export const ChannelLabelBreadcrumb: FC = () => {
    const { selection } = usePosts();
    return <Box sx={{ m: 1 }}>
        <Breadcrumbs separator="›" aria-label="channel-path">    {
            selection.selectionPath ? [...selection.selectionPath].reverse().map((channel, ix) =>
                <Link key={ix}
                    underline="hover"
                    color="inherit"
                >
                    {channel.content.toString()}
                </Link>
            ) : <Link
                underline="hover"
                color="inherit"
            >
                &nbsp;
            </Link>
        }</Breadcrumbs>
    </Box >
}