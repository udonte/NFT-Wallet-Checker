import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Button, Modal, Card, Container, Row, Col, } from 'react-bootstrap';
import Link from 'next/link';



const WalletNFTs = () => {
  const [nfts, setNfts] = useState(null);
  const [selectedNft, setSelectedNft] = useState(null);

  const route = useRouter();
  const { wallet } = route.query;


  useEffect(() => {
    if (wallet) {
    FetchNfts();      
    }
  }, [wallet])

  const FetchNfts = () => {
    const check = localStorage.getItem('nfts');
    if (check) {
      setNfts(JSON.parse(check));
    }
    else {
      fetch(`https://api.opensea.io/api/v1/assets?owner=${String(wallet)}&limit=12`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNfts(data.assets);
      })
      .catch((err) => {
      console.log(err)
    })
    }
  }
  return (
    <>
      <nav className="navbar navbar-default bg-dark text-white  navbar-expand-lg navbar-light border-bottom">
            <div class="container-fluid">
              <div class="navbar-header">
                <h1><a class="navbar-brand text-white font-weight-bold" href="#">AlturaNft</a></h1>
          </div>
          <ul class="nav navbar-nav">
            <li><Link legacyBehavior href="/" className='mt-5'>
                <a className ='btn btn-primary text-decoration-none' rel='noopener noreferrer'>Go back</a>
              </Link></li>
          </ul>
            </div>
          </nav>
      {nfts ? (
        <div className='bg-dark text-white h-100 d-flex justify-content-right w-100%'>
          <Container className='bg-dark'>
            <Row>
              {nfts.map((nft, index) => {
                return (
                  <Col key={index} lg={4} md={6} sm={12}>
                    <Card className='mb-2 mt-2 card-hover' onClick={() => setSelectedNft(nft)}>
                        <Card.Img variant="top" src={nft.image_url} />
                      <Card.Body>
                        <Card.Title className='text-black' >{nft.name}</Card.Title>
                        <Card.Text className='text-truncate text-black'>{nft.description}</Card.Text>
                        <Button variant='primary' onClick={() => setSelectedNft(nft)}>View Details</Button>
                    </Card.Body>
                    </Card> 
                  </Col>
                );
              })}
          </Row>
          <Modal show={selectedNft !== null} onHide={() => setSelectedNft(null)}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedNft?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Card.Img variant="top" src={selectedNft?.image_preview_url} />
              <p style={{fontWeight: 'bold'}}>Owner: {selectedNft?.asset_contract.name}</p>
              <p>{ selectedNft?.description }</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setSelectedNft(null)}> Close</Button>
              <Button>
                <a className ='btn btn-primary text-decoration-none' href={selectedNft?.permalink} target='_blank' rel='noopener noreferrer'>Purchase on OpenSea</a>
              </Button>
            </Modal.Footer>
          </Modal>
          </Container>
          </div>
        ) : null}
    </>
  )
}

export default WalletNFTs;