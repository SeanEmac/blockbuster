import React from 'react';
import Title from '../Title/Title';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


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
      <Title>Example Transactions</Title>

      <ButtonGroup
        orientation="horizontal"
        color="primary"
        aria-label="vertical outlined primary button group"
      > 
        {button('Default', 'b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da')}
        {button('Hitman', '4a0a5b6036c0da84c3eb9c2a884b6ad72416d1758470e19fb1d2fa2a145b5601')}
        {button('10,000 BTC Pizza', 'a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d')}
      </ButtonGroup>

    </React.Fragment>
  );
}