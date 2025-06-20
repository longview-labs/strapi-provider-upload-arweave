import type { DefaultOptions } from '../types';
import { getConfigDefaultValues } from '../utils';
import { testArweaveWallet } from './helpers';

const partialOptions: DefaultOptions = {
  arweaveWallet: JSON.stringify(testArweaveWallet),
};

const completeOptions: DefaultOptions = {
  arweaveWallet: JSON.stringify(testArweaveWallet),
  gateway: 'https://ar.io',
  getContentType: jest.fn(),
};

describe('Utils', () => {
  describe('Adds default values to the config', () => {
    test('Adds default values if config is not provided', () => {
      const config = getConfigDefaultValues(partialOptions);
      expect(config).toEqual({
        arweaveWallet: testArweaveWallet,
        gateway: 'https://arweave.net',
        getContentType: expect.any(Function),
      });
    });

    test('Does not add default values if config is provided', () => {
      const config = getConfigDefaultValues(completeOptions);
      expect(config).toEqual({
        ...completeOptions,
        arweaveWallet: testArweaveWallet,
      });
    });
  });

  describe('Checks the arweave wallet config', () => {
    describe('Invalid config', () => {
      test('Throws error when arweaveWallet is undefined', () => {
        const error = new Error(
          'Error parsing Arweave Wallet JSON, please ensure it is a valid JWK format.'
        );
        // @ts-ignore Test wrong configuration
        expect(() =>
          getConfigDefaultValues({ ...partialOptions, arweaveWallet: undefined })
        ).toThrow(error);
      });
      test('Throws error when arweaveWallet cannot be parsed as a JSON', () => {
        const arweaveWallet = "I'm not a valid JSON";
        const error = new Error(
          'Arweave Wallet provided is not a valid JSON. Please ensure it is a valid JWK format.'
        );
        expect(() => getConfigDefaultValues({ ...partialOptions, arweaveWallet })).toThrow(error);
      });

      test('Throws error when arweaveWallet can be parsed as a JSON, but contains random value', () => {
        const arweaveWallet = '{"random": "value"}'; // Not a valid JWK
        const error = new Error(
          'Invalid JWK format. Please check the content of your Arweave Wallet JWK'
        );
        expect(() => getConfigDefaultValues({ ...partialOptions, arweaveWallet })).toThrow(error);
      });

      test('Throws error when arweaveWallet is not a valid JWK', () => {
        const arweaveWallet = '{ "e": "something", "n": "something" }'; // Missing kty
        const error = new Error(
          'Invalid JWK format. Please check the content of your Arweave Wallet JWK'
        );
        expect(() => getConfigDefaultValues({ ...partialOptions, arweaveWallet })).toThrow(error);
      });
    });

    describe('Valid config', () => {});
  });
});
