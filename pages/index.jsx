import { Inter } from "next/font/google";
import Header from "../components/header";
import {
  execute,
  deployContract,
  DeployContractArgs,
  mint,
  MintArgs,
  mbjs,
} from "@mintbase-js/sdk";
import { useEffect, useState } from "react";
import { useWallet } from "@mintbase-js/react";
import Image from "next/image";
import { storeData, storeNfts } from "@mintbase-js/data";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { selector, activeAccountId } = useWallet();

  const [storeDataNFT, setStoreData] = useState([]);

  const handleDeployContract = async () => {
    const wallet = await selector.wallet();

    await execute(
      //because no contract factory id is provided it defaults to 'mintspace2.testnet'
      { wallet },
      deployContract({
        name: "MEStore2",
        ownerId: activeAccountId?.toString() || "",
        metadata: {
          symbol: "MES2",
        },
        factoryContractId: "mintspace2.testnet",
      })
    ).then((res) => console.log(res));
  };

  const getStoreData = async () => {
    const { data, error } = await storeNfts("mestore.mintspace2.testnet", true);
    if (error) {
      console.log(error);
    }
    if (data) {
      setStoreData(data.mb_views_nft_metadata_unburned);
    }
  };
  useEffect(() => {
    const config = {
      network: "testnet",
      callbackUrl: "https://mintbase.xyz/success",
      contractAddress: "mintspace2.testnet",
    };
    mbjs.config(config);
    getStoreData();
  }, []);

  return (
    <main className={`flex min-h-screen flex-col ${inter.className}`}>
      <Header />
      <div>
        <button
          onClick={handleDeployContract}
          className="bg-slate-400 mt-10 px-7 py-2"
        >
          Deploy Contract
        </button>
      </div>
      <div>
        {storeDataNFT.map((nft) => {
          console.log(nft);
          return (
            <div>
              <Image width={300} height={600} src={nft.media} />
              <h2>{nft.title}</h2>
              <h3>{nft.price}</h3>
              <p>{nft.minted_timestamp}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
