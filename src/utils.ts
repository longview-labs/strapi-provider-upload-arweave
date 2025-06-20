import z from 'zod';
import {
  optionsSchema,
  type DefaultOptions,
  type File,
  type Options,
} from './types';

export const getConfigDefaultValues = (config: DefaultOptions) => {
  try {
    return optionsSchema.parse(config);
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw new Error(err.issues[0]?.message);
    } else {
      throw err;
    }
  }
};

export const prepareUploadFile = async (
  file: File,
  config: Options,
) => {
  let fileBuffer : Buffer;
  if (file.stream) { // convert stream to buffer
    const buffers = []
    for await (const chunk of file.stream) {
      buffers.push(chunk);
    }

    fileBuffer = Buffer.concat(buffers);
  } else if (file.buffer) {
    fileBuffer = file.buffer;
  } else {
    throw new Error('File must have either a stream or a buffer.');
  }

  const fileSize = fileBuffer.length

  const fileContentType = config.getContentType(file);

  return { fileBuffer, fileSize, fileContentType };
};
