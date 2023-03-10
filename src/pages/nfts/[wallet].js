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
      fetch(`https://api.opensea.io/api/v1/assets?owner=${String(wallet)}`)
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
            <div className="container-fluid">
              <div className="navbar-header">
                <h1><a className="navbar-brand text-white font-weight-bold" href="#">AlturaNft</a></h1>
          </div>
          <div ></div>
          <ul className="nav navbar-nav ml-auto">
            <li className='nav-item'>
                <p className='bg-dark text-white mt-5' style={{ textAlign: 'right', color: 'red' }}>Showing NFT Collections for: <span style={{display: 'block', fontWeight: 'bold', color: 'yellowgreen'}}>{wallet}</span></p>
            </li>
          </ul>
          </div>
      </nav>
      {nfts ? (
        <div className='bg-dark text-white h-100 w-100%'>
          <Link legacyBehavior href="/" className='mt-5 ml-2'>
                <a className ='mt-3 ml-3 btn btn-primary text-decoration-none' rel='noopener noreferrer'>Go back</a>
              </Link>
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
              <Card.Img variant="top" src={selectedNft?.image_preview_url} style={{height: '300px', width: '100%'}} />
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
          <footer className="navbar navbar-default bg-dark text-white  navbar-expand-lg navbar-light border-top text-center d-flex align-items-center justify-content-center mt-5" ><p style={{ textAlign: 'center'}}>All Rights Reserved - 2023 </p></footer>
        </div>
        
        ) : null}
    </>
  )
}

export default WalletNFTs;