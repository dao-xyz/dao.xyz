import React, { FC, useContext, useEffect } from "react";
import { Box, Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, ImageList, ImageListItem, Input, InputLabel, Paper, Slide, Snackbar, Theme, Toolbar, Typography } from '@mui/material';
import { PublicKey } from "@solana/web3.js";
import { makeStyles } from '@mui/styles';
/* import { Metadata } from "@metaplex-foundation/mpl-token-metadata";*/
import { useWallet } from "@dao-xyz/wallet-adapter-react";

const useStyles = makeStyles((theme: Theme) => ({
    // style rule
    selected: {
        borderColor: theme.palette.primary.main + " !important",
    },
    imageSelectable: {
        cursor: 'pointer',
        border: "4px solid transparent",
        borderRadius: "5px",
    }

}));


interface NFTAsset {
    pubkey: PublicKey,
    name: string,
    image: string
}
export const UserProfileSettings: FC = () => {
    const classes = useStyles();
    const { publicKey } = useWallet();
    const [selectedNft, setSelectedNft] = React.useState<PublicKey | undefined>(undefined);
    const [nfts, setNfts] = React.useState<NFTAsset[]>([]);
    const [loadingNfts, setLoadingNfts] = React.useState<boolean>(false);
    const [showDialog, setShowDialog] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState(false);
    /*   useEffect(() => {
          if (publicKey) {
              setLoadingNfts(true);
              Metadata.findByOwnerV2(connection, publicKey).then((results) => {
                  Promise.all(results.map(async (result) => {
                      return {
                          pubkey: result.pubkey,
                          name: result.data.data.name,
                          image: await fetchNFTManifestImageUrl(result.data.data.uri)
                      } as NFTAsset;
                  })).then((assets) => {
                      setNfts(assets);
                  }).finally(() => {
                      setLoadingNfts(false);
                  })
              })
          }
  
      }, [publicKey]); */


    return <>
        <Button onClick={() => setShowDialog(true)}>PROFILE PIC</Button>
        <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
            <DialogTitle>Choose profile image</DialogTitle>
            <DialogContent>
                <DialogContentText>From the NFTs you own</DialogContentText>
                {loadingNfts ? <Box sx={{ display: "flex", justifyContent: "center" }} >
                    <CircularProgress />
                </Box> : <>{
                    nfts ? (<ImageList sx={{ maxWidth: 500, maxHeight: 450 }} rowHeight={164}>
                        {nfts.map((nft, ix) =>

                            nft.image ? (<ImageListItem onClick={() => { setSelectedNft(selectedNft === nft.pubkey ? undefined : nft.pubkey) }} key={ix} className={`${classes.imageSelectable} ${selectedNft === nft.pubkey ? classes.selected : ''}`} >

                                <img
                                    src={`${nft.image}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${nft.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={nft.name}
                                    loading="lazy"
                                /> :

                            </ImageListItem>) : (<Box key={ix}></Box>) // <Box key={ix} sx={{ p: 2 }}>Failed to load image for NFT with name: "{nft.name}"</Box>
                        )}
                    </ImageList>) : <>You do not have any NFTs associated this account</>
                }</>}
            </DialogContent>
        </Dialog>

    </>
}