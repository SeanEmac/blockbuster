import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';


export default function Examples(props) {
  const button = (text, value) => {
    return <Button 
      onClick={e => props.getTransactionID(e, e.currentTarget.value)}
      value={value}>
        {text}
    </Button>
  }

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Example Transactions:
      </Typography>

      <ButtonGroup
        orientation="horizontal"
        color="primary"
        aria-label="vertical outlined primary button group"
      > 
        {button('Hitman hired', '4a0a5b6036c0da84c3eb9c2a884b6ad72416d1758470e19fb1d2fa2a145b5601')}
        {button('10,000 BTC Pizza', 'a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d')}
      </ButtonGroup>
      

      <ButtonGroup
        orientation="horizontal"
        color="primary"
        aria-label="vertical outlined primary button group"
      > 
        {button('Unknown', 'e0c52443da06f55e768aa603eddbbcc0a42e3bbd0fd991e3b2902e0b3f5d59a8')}
        {button('Fraudulent', '98760ff05190565c623cc3dd98d1283412ec95ca68f6c05d5f0ef9f4c665b367')}
        {button('Licit', '2016e81461ce3ebad56af480bbda9da7157745aed63a870cc110e3bd143fa7d7')}
      </ButtonGroup>

      <ButtonGroup
        orientation="horizontal"
        color="primary"
        aria-label="vertical outlined primary button group"
      > 
        {button('Classified Fraud', '6a3223dae297cf80ae60d22f916a542f83fb9e60143dc09694a5412cab68b1b4')}
        {button('Classified Licit', '2c4c2a2eb5de89837ffb2e023e3a3d7ba3c0d7901c6594b23e6cbc6936aea1cb')}
      </ButtonGroup>

    </React.Fragment>
  );
}