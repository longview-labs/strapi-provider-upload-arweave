import type { DefaultOptions, File } from './types';
import { TurboFactory } from '@ardrive/turbo-sdk';
import { getConfigDefaultValues, prepareUploadFile } from './utils';

export default {
  init(providedConfig: DefaultOptions) {
    const config = getConfigDefaultValues(providedConfig);
    const { arweaveWallet } = config;
    const turbo = TurboFactory.authenticated({ privateKey: arweaveWallet });

    // const arweave = Arweave.init({});
    // let jwk = arweaveWallet;
    // if (!jwk) {
    //   console.log(__dirname);
    //   try {
    //     const arweaveJson = fs.readFileSync('arweave.json', 'utf-8');
    //     jwk = JSON.parse(arweaveJson);
    //   } catch (error) {
    //     // If reading the file failed, log the error
    //     console.error('Error reading arweave.json:', error);
    //   }
    // }

    // if (!jwk) {
    //   throw new Error('Arweave wallet JSON is required. Please set the arweaveWallet option, or have wallet as "arweave.json" file in the project root.');
    // }

    const upload = async (file: File) => {
      try {
        const { fileBuffer, fileSize, fileContentType } = await prepareUploadFile(file, config);

        const res = await turbo.uploadFile({
          fileStreamFactory: () => fileBuffer,
          fileSizeFactory: () => fileSize,
          dataItemOpts: {
            tags: [
              {
                name: "Content-Type",
                value: fileContentType,
              },
            ],
          },
        });

        file.url = `${res.id}`;
      } catch (error: any) {
        if (error.status === 402) {
          const message = `Insufficient balance. Please follow the documentation on how to top up your ArDrive Turbo account (https://github.com/longview-labs/strapi-provider-upload-arweave?tab=readme-ov-file#how-to-pay-for-uploads)`;
          console.error(message)
          throw new Error(message);
        } else if (error instanceof Error && 'message' in error) {
          const message = `Error uploading file to Arweave: ${error.message}`;
          console.error(message);
          throw new Error(message);
        } else {
          throw error;
        }
      }
    };

    return {
      async upload(file: File) {
        return upload(file);
      },
      async uploadStream(file: File) {
        return upload(file);
      },
      async delete(file: File) {
        return "Files save on Arweave cannot be deleted as they are immutable.";
      },
      isPrivate() {
        return true;
      },
      async getSignedUrl(file: File) {
        // transform url to specific gateway
        return {
          url: `${config.gateway}/${file.url}`
        };
      },
    };
  },
};
