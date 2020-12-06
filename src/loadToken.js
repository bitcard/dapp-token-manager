import { read, readBagsOrTokensDataTerm, readBagsTerm } from 'rchain-token';

export const loadToken = (registryUri) => {
  return new Promise((resolve, reject) => {
    dappyRChain
      .exploreDeploys([
        read(registryUri),
        readBagsOrTokensDataTerm(registryUri, 'tokens'),
        readBagsOrTokensDataTerm(registryUri, 'bags'),
        readBagsTerm(registryUri),
      ])
      .then((a) => {
        const results = JSON.parse(a).results;

        const ed1 = blockchainUtils.rhoValToJs(
          JSON.parse(results[0].data).expr[0]
        );
        const nonce = ed1.nonce;
        const locked = ed1.locked;
        const publicKey = ed1.publicKey;
        const tokensData = blockchainUtils.rhoValToJs(
          JSON.parse(results[1].data).expr[0]
        );
        console.log('tokensData');
        console.log(tokensData);
        const tokensDataDecoded = {};
        Object.keys(tokensData).forEach((k) => {
          tokensDataDecoded[k] = decodeURI(tokensData[k]);
        });
        const bags = blockchainUtils.rhoValToJs(
          JSON.parse(results[3].data).expr[0]
        );
        console.log('bags');
        console.log(bags);
        const bagsData = blockchainUtils.rhoValToJs(
          JSON.parse(results[2].data).expr[0]
        );
        console.log('bagsData');
        console.log(bagsData);
        const bagsDataDecoded = {};
        Object.keys(bagsData).forEach((k) => {
          bagsDataDecoded[k] = decodeURI(bagsData[k]);
        });
        resolve({
          publicKey,
          nonce,
          locked,
          tokensData: tokensDataDecoded,
          bags: bags,
          bagsData: bagsDataDecoded,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
