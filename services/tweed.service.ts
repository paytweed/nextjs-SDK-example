import { TweedBackendSDK } from "@paytweed/backend-sdk";
import nftService from "./nft.service";
import tokenService from "./token.service";

const TWEED_API_KEY = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
const TWEED_API_SECRET =
  "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

let _client: Awaited<ReturnType<typeof TweedBackendSDK.setup>> | null = null;

export const getTweedSDK = async () => {
  if (_client) return _client;

  _client = await TweedBackendSDK.setup({
    apiKey: TWEED_API_KEY,
    apiSecret: TWEED_API_SECRET,
    defaultBlockchainIds: ["ethereumSepolia"],
    callbacks: {
      getNftPurchaseData: async ({ nftId }) => nftService.getById(nftId),
      getTokenPurchaseData: async ({ tokenId }) =>
        tokenService.getById(tokenId),
    },
  });
  return _client;
};
