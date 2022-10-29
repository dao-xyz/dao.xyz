import React, { useState } from "react";

const drawerWidth = 240;

export function Home() {

    /*     const [channels, setChannels] = useState<AccountInfoDeserialized<Shard<PostInterface>>[]>([]);
     */
    return (
        <></>
        /*   <Container maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
              <Grid container flexDirection="column" spacing={2}>
                  <Grid item>
                      <ChannelsFilter onChange={(channels) => {
                          setChannels(channels)
                      }} />
                  </Grid>
                  <Grid item>
                  </Grid>
              </Grid>
          </Container> */
        /*  <Box sx={{ display: "flex" }}>

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
                <Channels />
            </Box>
        </Drawer>
        <Feed />
    </Box> */
    );
}

export default Home;