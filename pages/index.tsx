import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import mapboxgl from "mapbox-gl";
import Link from "next/link";
import { useAppContext } from "@context/state";
import { changeNetwork } from "@context/changeNetwork"
import networks from "@context/networks.json"
import Swal from 'sweetalert2'

const Home = () => {
  const [usdtRaised, setUsdtRaised] = useState(0)
  const imgUrl = 'https://ico-frontend-62th.vercel.app/'
  const { connectWallet, walletAddress, transfer, ondkBalance } = useAppContext();
  const usdtRef = useRef(null);
  const ondkRef = useRef(null);
  const onkdReceiverAddressRef = useRef(null)
  console.log(walletAddress)
  const [selectedNetwork, setSelectedNetwork] = useState({
    "providerUrl": "https://rpc-mainnet.maticvigil.com/",
    "network": "polygon",
    "chainId": "137",
    "chainIdHex": "0x89",
    "usdtAddress": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"
  });
  const [selectedWallet, setSelectedWallet] = useState(0);
  const transferForm = () => {
    const usdtValue = parseFloat(usdtRef.current.value);
    const ondkValue = parseFloat(ondkRef.current.value);
    const onkdReceiverAddressValue = onkdReceiverAddressRef.current.value
    // Verificar si el usuario ingresó un valor válido en USDT
    if (!isNaN(usdtValue)) {
      ondkRef.current.value = (usdtValue / 2.1).toFixed(2); // Convertir a ONDK
    } else if (!isNaN(ondkValue)) {
      usdtRef.current.value = (ondkValue * 2.1).toFixed(2); // Convertir a USDT
    }
    const { providerUrl, network, chainId } = selectedNetwork

    if (usdtValue == 0 || ondkValue == 0 || onkdReceiverAddressValue.lenght > 42) {
      alert('fill the gaps')
    } else {
      Swal.fire({
        title: "Varify your deposit address",
        text: onkdReceiverAddressValue,
        icon: "warning"
      });
      console.log(usdtValue, ondkValue, network, chainId, onkdReceiverAddressValue, providerUrl)
      transfer(usdtValue, selectedNetwork.usdtAddress, ondkValue, network, chainId, onkdReceiverAddressValue, providerUrl)

    }
  };

  const handleUsdtChange = (e) => {
    const usdtValue = parseFloat(e.target.value);
    if (!isNaN(usdtValue)) {
      ondkRef.current.value = (usdtValue / 2.1).toFixed(2);
    } else {
      ondkRef.current.value = "";
    }
  };
  const handleOndkChange = (e) => {
    const ondkValue = parseFloat(e.target.value);
    if (!isNaN(ondkValue)) {
      usdtRef.current.value = (ondkValue * 2.1).toFixed(2);
    } else {
      usdtRef.current.value = "";
    }
  };



  const handleNetworkChange = (event) => {
    const selectedValue = event.target.value;
    const networkData = networks[selectedValue];
    setSelectedNetwork(networkData);

  };

  useEffect(() => {
    console.log(selectedNetwork)
    if (selectedNetwork.network != '') {
      changeNetwork(selectedNetwork)
    }
  }, [selectedNetwork]);
  const handleImageClick = (index) => {
    setSelectedWallet(index);
    if (index == 0) {
      Swal.fire({
        title: "Add Orden Global blockchain and ONDK token to Metamask",
        text: "https://ordenglobal-rpc.com 0x961e742066e3d1cAD863A45a82C7B6e87bB3A02F",
        icon: "warning"
      });
      onkdReceiverAddressRef.current.value = walletAddress
    } else if (index == 1) {
      Swal.fire({
        title: "Copy your wallet from VetaWallet",
        html: `
    <p>Make sure to type the correct VetaWallet Address</p>
    <a href="https://www.vetawallet.com/register" target="_blank" autofocus>New to VetaWallet? <b>Register</b></a>
  `,
        icon: "warning"

      });
      onkdReceiverAddressRef.current.value = ''
    }
    console.log(index)
  };
  return (
    <div>
      <div className="header">
        <img src={imgUrl + 'WhatsApp Image 2024-06-12 at 10.44.57 AM_preview_rev_1.png'} alt="logo" />
        <div className="info">
          <a href="">Whitepaper</a>
          <a href="">About</a>
        </div>
        <div className="actions">
          <div className="social">
            <img src={imgUrl + "x.png"} alt="x" />
            <img src={imgUrl + "telegram.png"} alt="telegram" />
          </div>
          {walletAddress.length > 0 ? (
            <button className="actions_buy-now text-black" style={{ height: '45px' }}>
              {walletAddress[0].slice(0, 6)}...{walletAddress[0].slice(-4)}
            </button>
          ) : (
            <button className="actions_buy-now" onClick={connectWallet}>CONNECT WALLET</button>
          )}
        </div>

      </div>
      <div className="main__bg">
        <div className="main__info">
          <h2>Increase your profits with ORDEN KAPITAL: the best investment!</h2>
          <h3>GOLD IN YOUR HANDS</h3>
          <video
            autoPlay
            loop
            controls
            src="https://ico-frontend-62th.vercel.app/WhatsApp%20Video%202024-06-13%20at%2014.35.06.mp4"
          >
          </video>
        </div>
        <div className="main__info2">
          <div className="main_box">
            <img src={imgUrl + "logo.png"} alt="x" />
            <h1>SALE $ONDK</h1>

            <div className="divider flex justify-around w-100 align-center">
              <hr />
              <p className="font-bold">1 $ONDK = 2.10 USDT</p>
              <hr />
            </div>
            <div className="flex flex-col w-96 text-left ">
              <p className="font-bold mb-0 text-Left ">SELECT CURRENCY</p>
            </div>
            <div className="flex flex-col w-96 justify-center ">
              <button className="button-usdt  " >
                <img src={imgUrl + "tether-usdt-seeklogo.svg"} alt="x" />
                <p>USDT</p>
              </button>
            </div>

            <div className="flex w-96 col-pay">
              <form action="">
                <div className="flex flex-col w-96 text-left ">

                  <p className="font-bold mb-0">SELECT NETWORK</p>
                  <select className="input-container" name="network" id="network" onChange={handleNetworkChange}>                    <option value="polygon">Polygon</option>
                    <option value="ethereum">Ethereum</option>
                    <option value="polygon">Polygon</option>
                    <option value="bnb">Binance Smart Chain</option>
                  </select>
                </div>
                <div className="flex flex-col w-96 text-left ">
                  <p className="font-bold mb-0">SELECT WALLET</p>
                  <div className="flex flex w-96 justify-center ">
                    <img
                      className="metamask_logo cursor-pointer"
                      src={'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png'}
                      alt="MetaMask"
                      onClick={() => handleImageClick(0)}
                    />
                    <img
                      className="metamask_logo cursor-pointer"
                      src={'https://i.ibb.co/KN5YfY6/vetawallet.png'}
                      alt="VetaWallet"
                      onClick={() => handleImageClick(1)}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-96 text-left ">

                  <p className="font-bold mb-0">ONDK DEPOSIT ADDRESS</p>
                  {selectedWallet === 0 && walletAddress.length > 0 ? (
                    <input
                      className="input-container"
                      type="text"
                      placeholder="0x..."
                      required
                      readOnly
                      ref={onkdReceiverAddressRef}
                    />
                  ) : selectedWallet === 1 ? (
                    <input
                      className="input-container"
                      type="text"
                      placeholder="0x..."
                      required
                      ref={onkdReceiverAddressRef}
                    />) : null}
                </div>
                <div className="flex w-96 ">

                  <div className="flex flex-col w-48 text-left">
                    <p>USDT you pay</p>
                    <div className="flex w-50 input2-container">
                      <input
                        className="input2 86"
                        type="text" placeholder="0x..."
                        ref={usdtRef}
                        onChange={handleUsdtChange}
                      />
                      <img src={imgUrl + "tether-usdt-seeklogo.svg"} alt="x" />
                    </div>
                  </div>
                  <div className="flex flex-col w-48 text-left">
                    <p>ONDK you receive</p>
                    <div className="flex w-50 input2-container">
                      <input
                        className="input2 86"
                        type="text" placeholder="0x..."
                        ref={ondkRef}
                        onChange={handleOndkChange}
                      />
                      <img src={imgUrl + "ONDK-_preview_rev_1.png"} alt="x" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <button className="button-usdt2 text-black w-60" onClick={transferForm}>BUY NOW $ONDK</button>
            <p>Powered by SHARK TECHNOLOGY</p>
          </div>
        </div>
        <div className="partners ">
          <img src={imgUrl + 'CoffeBeanSwap_Horizontal-1.png'} alt="logo" />
          <img src={imgUrl + 'crypto.png'} alt="logo" />
          <img src={imgUrl + 'logo-3.png'} alt="logo" />
          <img src={imgUrl + 'Logo-OrdenEx-Horizontal.png'} alt="logo" />
          <img src={imgUrl + 'Veta_Wallet_Horizontal-removebg-preview-2.png'} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Home;
