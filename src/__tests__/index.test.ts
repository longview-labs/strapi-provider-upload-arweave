import { TurboFactory } from '@ardrive/turbo-sdk';
import provider from '../index';
import { defaultGateway } from '../types';
import {
  testArweaveWallet,
  mockedConfig,
  mockedBigFileData,
  mockedFileData,
  mockedFileStreamData,
  mockedTurboClient,
} from './helpers';

const { TurboFactory: ActualTurboFactory } = jest.requireActual('@ardrive/turbo-sdk');
const actualAuthenticated = ActualTurboFactory.authenticated;

jest.mock('@ardrive/turbo-sdk', () => ({
  __esModule: true,
  TurboFactory: {
    authenticated: jest.fn(() => mockedTurboClient),
  },
}));

describe('Provider', () => {
  beforeEach(() => {
    mockedFileData.url = '/';
    jest.clearAllMocks();
  });

  describe('Init', () => {
    test('Provides object with upload, uploadStream, delete, isPrivate and getSignedUrl methods', () => {
      const result = provider.init(mockedConfig);
      expect(result).toHaveProperty('upload');
      expect(typeof result.upload).toEqual('function');
      expect(result).toHaveProperty('uploadStream');
      expect(typeof result.uploadStream).toEqual('function');
      expect(result).toHaveProperty('delete');
      expect(typeof result.delete).toEqual('function');
      expect(result).toHaveProperty('isPrivate');
      expect(typeof result.isPrivate).toEqual('function');
      expect(result).toHaveProperty('getSignedUrl');
      expect(typeof result.getSignedUrl).toEqual('function');
    });
  });

  describe('ArDrive Turbo SDK', () => {
    test('Creates instance of ArDrive Turbo Client with right configurations', () => {
      provider.init(mockedConfig);
      expect(TurboFactory.authenticated).toHaveBeenCalledWith({
        privateKey: testArweaveWallet,
      });
    });
  });

  describe('Upload', () => {
    test('Saves file with buffer', async () => {
      const providerInstance = provider.init(mockedConfig);
      await providerInstance.upload(mockedFileData);

      expect(mockedTurboClient.uploadFile).toHaveBeenCalledTimes(1);
      expect(mockedTurboClient.uploadFile).toHaveBeenCalledWith({
        fileStreamFactory: expect.any(Function),
        fileSizeFactory: expect.any(Function),
        dataItemOpts: {
          tags: [
            {
              name: 'Content-Type',
              value: mockedFileData.mime,
            },
          ],
        },
      });
    });

    test('Saves file with stream', async () => {
      const providerInstance = provider.init(mockedConfig);
      await providerInstance.uploadStream(mockedFileStreamData);

      expect(mockedTurboClient.uploadFile).toHaveBeenCalledTimes(1);
      expect(mockedTurboClient.uploadFile).toHaveBeenCalledWith({
        fileStreamFactory: expect.any(Function),
        fileSizeFactory: expect.any(Function),
        dataItemOpts: {
          tags: [
            {
              name: 'Content-Type',
              value: mockedFileStreamData.mime,
            },
          ],
        },
      });
    });

    test(
      'throws error if file size is greater than 100KB and wallet does not have enough balance',
      async () => {
        (TurboFactory.authenticated as jest.Mock).mockImplementationOnce(actualAuthenticated);
        const providerInstance = provider.init(mockedConfig);
        const error = new Error(
          'Insufficient balance. Please follow the documentation on how to top up your ArDrive Turbo account (https://github.com/longview-labs/strapi-provider-upload-arweave?tab=readme-ov-file#how-to-pay-for-uploads)'
        );
        await expect(providerInstance.upload(mockedBigFileData)).rejects.toThrow(error);
      },
      30 * 1000
    );
  });

  describe('Delete', () => {
    test('Deletes file', async () => {
      mockedFileData.url = 'base/path/tmp/strapi/4l0ngH45h.jpeg';
      const providerInstance = provider.init(mockedConfig);
      const res = await providerInstance.delete(mockedFileData);
      expect(res).toEqual('Files save on Arweave cannot be deleted as they are immutable.');
    });
  });

  describe('Get signed url', () => {
    test('Get url with default gateway', async () => {
      const config = { arweaveWallet: mockedConfig.arweaveWallet };
      const providerInstance = provider.init(config);
      expect(providerInstance.getSignedUrl(mockedFileData)).resolves.toEqual({
        url: `${defaultGateway}/${mockedFileData.url}`,
      });
    });

    test('Get url with custom gateway', async () => {
      const config = {
        arweaveWallet: mockedConfig.arweaveWallet,
        gateway: 'https://custom-gateway.com',
      };
      const providerInstance = provider.init(config);
      expect(providerInstance.getSignedUrl(mockedFileData)).resolves.toEqual({
        url: `https://custom-gateway.com/${mockedFileData.url}`,
      });
    });
  });
});
