import { hooks } from "@paytweed/frontend-sdk-react";
import { Button } from "../../../style";

interface WalletActionsSectionProps {
  selectedChain: string;
}

export default function WalletActionsSection({
  selectedChain,
}: WalletActionsSectionProps) {
  const [sendCoinToWallet] = hooks.useSendCoinToWallet();
  const [createRecoveryKit] = hooks.useCreateRecovery();
  const [buyNft] = hooks.useBuyNft();
  const [createRecovery] = hooks.useCreateRecovery();
  const tweedClient = hooks.useTweedFrontendSDK();

  async function handlSendTransaction() {
    console.log("Getting wallet address...");
    const address = await tweedClient.wallet.getAddress({
      blockchainId: selectedChain,
    });
    console.log("Address: ", address);

    console.log("Sending 1 coin to wallet...");
    try {
      await sendCoinToWallet({
        walletAddress: address,
        value: "1",
        blockchainId: selectedChain,
      });
      console.log("Sent 1 coin to wallet");
    } catch (error) {
      console.error("Error while sending coin to wallet: ", error);
    }
  }

  function handelCreateRecoveryKit() {
    createRecoveryKit({
      callbacks: { onSuccess: () => console.log("logged out") },
    });
  }

  function handleBuyNft() {
    buyNft({
      nftId: "1",
      callbacks: {
        onSuccess: (payload: unknown) => {
          console.log("Internal callback returned success data:", {
            payload,
          });
        },
        onError: (err: unknown) => {
          console.error("Internal callback returned error:", { err });
        },
      },
    })
      .then((response: unknown) => {
        console.log("Successfully bought NFT: ", { response });
      })
      .catch((err: unknown) => {
        console.error("Error while buying NFT: ", { err });
      });
  }

  function handleCreateRecovery() {
    createRecovery({});
  }

  return (
    <>
      <Button onClick={handlSendTransaction}>Send Transaction</Button>
      <Button onClick={handelCreateRecoveryKit}>Create a Recovery Kit</Button>
      <Button onClick={handleBuyNft}>Buy Nft</Button>
      <Button onClick={handleCreateRecovery}>Create Recovery Kit</Button>
    </>
  );
}
