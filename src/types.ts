import type { ReadStream } from 'node:fs';
import type { JWKInterface } from 'arweave/node/lib/wallet';
import { z } from 'zod';

const fileSchema = z.object({
  name: z.string(),
  alternativeText: z.string().optional(),
  caption: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  formats: z.record(z.string(), z.unknown()).optional(),
  hash: z.string(),
  ext: z.string().optional(),
  mime: z.string(),
  size: z.number(),
  sizeInBytes: z.number(),
  url: z.string(),
  previewUrl: z.string().optional(),
  path: z.string().optional(),
  provider: z.string().optional(),
  provider_metadata: z.record(z.string(), z.unknown()).optional(),
  stream: z.unknown().optional(), // `ReadStream` can't be validated easily, so `any` or skip
  buffer: z.unknown().optional(), // same for `Buffer`
});

export type File = z.infer<typeof fileSchema> & {
  stream?: ReadStream;
  buffer?: Buffer;
};

const jwkSchema = z.object({
	"kty": z.string({ error: "Invalid JWK format. Please check the content of your Arweave Wallet JWK" }),
	"e": z.string({ error: "Invalid JWK format. Please check the content of your Arweave Wallet JWK" }),
	"n": z.string({ error: "Invalid JWK format. Please check the content of your Arweave Wallet JWK" }),
  "d": z.string().optional(),
	"dp": z.string().optional(),
	"dq": z.string().optional(),
	"ext": z.boolean().optional(),
	"p": z.string().optional(),
	"q": z.string().optional(),
	"qi": z.string().optional(),
});

type GetContentTypeFn = (file: File) => string;

const defaultGetContentType = (file: File) => file.mime;

export const defaultGateway = 'https://arweave.net';

export const optionsSchema = z.object({
  arweaveWallet: z
    .preprocess((input) => {
      if (typeof input === 'string') {
        try {
          return JSON.parse(input);
        } catch {
          throw new Error(
            'Arweave Wallet provided is not a valid JSON. Please ensure it is a valid JWK format.'
          );
        }
      }
      
      return input;
    }, jwkSchema),
  gateway: z.url().default(defaultGateway),
  getContentType: z
    .custom<GetContentTypeFn>((val) => typeof val === 'function')
    .optional()
    .default(() => defaultGetContentType),
});

export type Options = z.infer<typeof optionsSchema>;

export type DefaultOptions = Partial<Omit<Options, 'arweaveWallet'>> & {
  arweaveWallet: JWKInterface | string;
};
