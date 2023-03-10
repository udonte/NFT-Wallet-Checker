import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Form, Button, Container } from 'react-bootstrap'
import { useState } from 'react'
import { useRouter } from 'next/router'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [walletAddress, setWalletAddress] = useState('')
  const router = useRouter();

  const GoToNFTPage = (e) => {
    e.preventDefault();
    if (walletAddress !== '') {
      //go to NFT Page
      router.push(`/nfts/${walletAddress}`);
    }
  }
  return (
    <>
      <Head>
        <title className='jumbotron'>NFT Checker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
       <nav className="navbar navbar-default bg-dark text-white  navbar-expand-lg navbar-light border-bottom">
            <div className="container-fluid">
              <div className="navbar-header">
                <h1><a className="navbar-brand text-white font-weight-bold" href="#">AlturaNft</a></h1>
              </div>
            </div>
          </nav>
      <div className='bg-dark text-white vh-100 d-flex justify-content-right'>
      <Container className='fluid col-md-6 mx-auto'  >
      <h1 className='mb-5 mt-5' >NFT CHECKER</h1>
        <Form onSubmit={GoToNFTPage}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Wallet address</Form.Label>
            <Form.Control className='col-xs-12' type="text" placeholder="Enter wallet address e.g 0xc0E680dF15D9b5Eff9d5a426DC139CA4E23196Df" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} style={{width: '40rem'}} />
          </Form.Group>
          <Button variant="primary" type="submit">Search NFTs</Button>
          </Form>
        </Container>
      </div>
          <footer className="navbar navbar-default bg-dark text-white  navbar-expand-lg navbar-light border-top text-center d-flex align-items-center justify-content-center" ><p style={{ textAlign: 'center'}}>All Rights Reserved - 2023 </p></footer>
    </>
  )
}
