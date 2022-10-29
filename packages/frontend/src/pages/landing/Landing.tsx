import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Button, CardActionArea, CardActions, Container, Divider, Grid, Link, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import "./Landing.css"
import PaidIcon from '@mui/icons-material/Paid';
import ShareIcon from '@mui/icons-material/Share';
// Landing page for choosing network
export default function Landing() {
  const icon = PublicIcon;
  return (
    <>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item  >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              gutterBottom
              fontWeight={600}
            >
              DAO.xyz
            </Typography>
          </Grid>
          <Grid item>
            {/* <img src={logo} className="Landing-logo" alt="logo" /> */}
          </Grid>
        </Grid>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          A social governance protocol for governing any DAO or community
        </Typography>
      </Container>
      { }
      <Container maxWidth="md" component="main">
        <Grid container spacing={2} justifyContent="center"  >
          <Grid item
            xs={12}
            md={4}  >
            <Card sx={{ minWidth: 275 }}>
              <CardContent >
                <Grid container spacing={1}
                >
                  <Grid item>
                    <ShareIcon fontSize='large' />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" gutterBottom>
                      Unifying
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      Governing DAOs is not just about creating and voting on proposals. StakeTogether brings a one-stop platform for building communities and DAOs.
                    </Typography>
                  </Grid>
                </Grid>

              </CardContent>
            </Card>
          </Grid>
          <Grid item
            xs={12}
            md={4}  >
            <Card sx={{ minWidth: 275 }}>
              <CardContent >
                <Grid container spacing={1}          >
                  <Grid item>
                    <PublicIcon fontSize='large' />
                  </Grid>
                  <Grid item >
                    <Typography variant="h5" gutterBottom>
                      Built to scale
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      By providing support for multi-token voting and vote delegation based on context. DAO governance can both become versatile and efficient.
                    </Typography>
                  </Grid>
                </Grid>

              </CardContent>
            </Card>
          </Grid>
          <Grid item
            xs={12}
            md={4}  >
            <Card sx={{ minWidth: 275 }}>
              <CardContent >
                <Grid container flexDirection="column" spacing={1}>

                  <Grid item >
                    <Grid container spacing={1}>
                      <Grid item>
                        <PaidIcon fontSize='large' />

                      </Grid>
                      <Grid item>
                        <Typography variant="h5" gutterBottom>
                          Buy and sell
                        </Typography>
                      </Grid>
                    </Grid>

                  </Grid>

                  <Grid item>

                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      With smart posts, you can sell or buy assets like governance tokens or NFTs. Community voting can also help in ensuring quality.
                    </Typography>
                  </Grid>
                </Grid>

              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      { }

      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item  >
            <Typography
              variant="h3"
              align="center"
              gutterBottom
            >
              We have not launched yet...
            </Typography>
          </Grid>

        </Grid>
        <Typography variant="h5" align="center" color="text.primary" component="p">
          But join our discord in the mean time
        </Typography>
      </Container>
      <Container >
        <Grid container spacing={2} justifyContent="center">
          <Grid item  >
            <Button size="large" variant="contained" component={Link} href="https://discord.gg/BvRJSV73">
              Join Discord
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
