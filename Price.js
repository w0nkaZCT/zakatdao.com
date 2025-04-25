import { ethers } from 'ethers';

const getTokenPriceInUSD = async () => {
  const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');

  const pairAddress = 'XXX'; // ВСТАВИТЬ АДРЕС ПОТОМ
  const pairAbi = [
    'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
    'function token0() external view returns (address)',
    'function token1() external view returns (address)'
  ];

  const pairContract = new ethers.Contract(pairAddress, pairAbi, provider);
  const [reserve0, reserve1] = await pairContract.getReserves();

  const token0 = await pairContract.token0();
  const token1 = await pairContract.token1();

  const yourTokenAddress = '0x684fCa97e0C45948d6d27D3741a0641269A8E2E0';
  const isToken0 = token0.toLowerCase() === yourTokenAddress.toLowerCase();

  const reserveYourToken = isToken0 ? reserve0 : reserve1;
  const reserveBNB = isToken0 ? reserve1 : reserve0;

  const priceBNB = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd')
    .then(res => res.json())
    .then(data => data.binancecoin.usd);

  const priceInBNB = reserveBNB / reserveYourToken;
  const priceInUSD = priceInBNB * priceBNB;

  return priceInUSD;
};
