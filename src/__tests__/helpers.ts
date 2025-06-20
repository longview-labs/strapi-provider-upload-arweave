import { Readable } from 'stream';
import type { ReadStream } from 'fs';

export const testArweaveWallet = {
  "kty": "RSA",
  "e": "AQAB",
  "n": "jxRl8XQ2vFeawkKbCUClJUt7qBUDFQHwIcElh5iXU-ipeh4PL5wZG-kVHAGHOhFHXUOaHF5YOibTNGkCLvvazwEpkAexE0keBqPXRw3gj8Yie7W3m5lo21VP7EM2ysrPuIOEw7G3y5jOy6KJHawq1PQ9waWei7OelGEmDFfEhGwBGaAi6yDbHPcehIbIK0nKvY99PBAcGrSrdhkM1TcVITTkPKJ6hIbl4xBDMhxi0FZVxptFpwZ-YpeKdPQdldEu6SbsOZNWqiP5GjiWy12UL7CxR9mQI1JI9rb2EFg77Xa4EawpQf1jLyn3t_V0Gd3zi_kP8AJE1KAd69a8qiduiFLz3ElFcPTUigYa3ObjeksaA6hvljqRfxh1nthjT5MFPk6b7DpNEqkNNhwfN10Za07gIXm7a6-R5gguKvjgHO1gSQaKdNuFMtjJJFfe87QAZrDrkTlEKYcXMtl5chKJCeEN689PVY3Sz2SJ_9bE8nmDUdRvFGPfnlmqXNz-y7mP3ujCZ1dv-UuBs80HyRY4rXfBWZwbQ8BA3VQWY8TAdqxtQMekqyKy9sAFJk12SsRkwbN9BNF6gWZHENl3oQa5Q_QVnMfAEIKHzXNLzLBplVDLxcBAbFwcUFaZ2gHEPlAGI7VIH97oQFX9yVhSBhFFcF8wWhcvvLU6v7Iuv5b6UME",
  "d": "FV3rd2pufiPrBZWix3fy8aXbGpfAtRNsA-5vJ1e_SZWWMZlplSePjF57e4oy4pYP_TqKOjBQpqaDpfEElXWhEIbQ6SRs6j9iD4XKMV8-KNpi7eyONdtsEE0mOVc0SIaPDLP_UKYql2oDf9-O8HJ0lwa-bjvIeH5jcS8s2m0E-O2UIHqMnGZ0slepJAtouyYy86oI_r49JDPU4zcMdo7aRfI7H174QvBORmF4V3RrwUcTWix382CB4UFWOO73uBbcFY9teY-qQpBKtAK9ajNYXOLbJqqz3sJ8CPP7vScgE-9Fv8XhB2zKshFnX_50zyQZKc8Q9TuxgbtDnKOd2x82X0Xs7avPUhnLjj3bZixZ8yLFgj4TFzrQSGZnEEx_PIa1D811QCpUlu4du2mN6pGQTt8ewH1JwOZnAC-xdIGvIDdHhrw65fJq3ZMCKo3HLzlkIzfWyEB3pHv-GpN5RX-bRRDmxFvHRS56haJaOHaYOzwe3sL1xqf6p1tEm-f8qrVMMtBFffJf8aDBOznRBEJWheKGaOymZD2buqXPq6RIgLjgLai4knAc3cb939VFejYwWzS9qnUWs6oBT-_i8DgveXkg0bpVBSqWEzIbI3mfmsNnkoVY6oR6Rt74LZBvA-v1ziQJ_Auc-tOO0MzyKwW9O427hXwztluh5b73IW3NUG0",
  "p": "0vv-CkwdARY9U-wKKJrc11fyr_1l1uoh3MO6w9lsiFkaKU73BJc9HuG_zng_mrW-wma-vXAPmMNIWbaPQSEITt_Wg9qAvvBEjplFhCHkeGDTDDr5M5eYkwb_cZ8bKNuJzp8IF1wvBOne2uoOEjbKV8KtewlO-lOUr_T7NK-H28P2YzzTF_zlJwoYB6nwbdn_pWrEjAwiLFvBoG-wtgQdTgCHJd_nsGf9YXXHiAKnHkC2IEBvDQamuYkb1EVZB_MkvshbQoZKWPrIJkaQ7P3MmTZNLvC2CVkdf55AgY3Xu6ORruycf-AOZn36HTviuZBPcRVEIDuOJqeRhq4RZ9m1rw",
  "q": "rZtweKaRrhHYNRvbxidbSCnU0ehpT0pD69nknWesN8CBGDh8lYERf-YbD0j0r7dkQ-yQ2Xq5s5HJAXkldSjw7iF_GTSDaxxEo0j3cUOB1qW1LWnIuGHqPL0VrRGViUS_3WQNvSN9b3d-O_EdZxqSonFjj_kz7sHcQZPsA1-zI8uk0IhR5AHKwN1O129RO503A73JYB4spGaht4OcYWopx3LA4UxboxFntDUopfn-8jeTA6nWl1p8_M9GT79ev6orOYgWTgpqphQne8fahG66zSDqqs2cLpewrOUJxwfo__NLlnQ0DA-WBl62GZsslBkD3tP8J6CK9gvBQVIppchsjw",
  "dp": "xu2RuWPKdRvi9x229lINp3zk9cqWGuzmwKBLmB2Il4ZrhEdP4KQ4nMV9c88tKVHzapg1f6gJDKATt4LJzz619qhWOjvq6BzihxE82jiakmW4l--Cx4JH-Vi_wQGjOgLFDGwl1OC19IwN85p7afD_F4AW0csVDDGCH-V8dVCLaEp8JVVUM2nfJc_-mDtC1lCVGgJxDxrhnbFl_z9P_k4i00jsJGnYqhtibGIAn9zgdUXOctpN2ppK2OTNuHcqWrSGENwYL8EumHbcADrIqqsiHdN1Mq0C9g1wIsOzTnPO1LyEv8mYRXmcGkbtbGLqgsvuG1FRypJclVWpgLLe9mvvQQ",
  "dq": "J10zZ2f9aEbLi19BufB6liZGB0J3fm8Mb5H8cGRtfEa9_svwE8YsPZ_jStf0A1PF_FDLl0RojvrjZN4fTC14U8Zslz58_fBu78c_tALmkdEI_78YsBYjkpodLBzsly9rgbuKEfTWIEwr51OIozQ3Q3YKaT7MM7rpQkVUIn-0ks0-FbqTNuvhGVIU6mxnMuk27DZATvcIkE5lJMNG1h_IUV0Htw4lSRhNN2NGUDwbPrizMQV1juQJqxkkjDiMN1FSc70TsaZTAE1Zlot-VMD2wkRQcWIlo7rpaIqWaPa2MjLsVLUMiB-QmOkoyS2SMhJp-kB-0E1qtNd9fl4u61RCqQ",
  "qi": "hMolBLYcGES9yaDdPdJCqqfDP9kBbodD03CmYPKm_2cMAzlmkihM08PHNBgwpk_hFHqvF6SNWlTpR3tTn-cPa6pxTMtjgp6Ap8s8fyfZJCpZxP-7dC4gkCyYbHT13rpm-tjT8YnPtVniSzLS_bQklwKweh7fLm5Xxguom_91Poas61C_PJG3tLQCkAZJ4IJqbJCrcLGSf-jqGIU_f-TtUI-teY-1y0yRAsI9XkPmalUaNyGKne-epjMo9jje9OBFIINVNYBD1sepzt9nYzV3gI--JrLTJOQF5a2J2xPY2TJ7Cus-Wn9ZOOruNwIXWlGObA1ejdkV0tgcSOVjj7yhGw"
}; // real Arweave wallet key for testing

export const mockedConfig = {
  arweaveWallet: JSON.stringify(testArweaveWallet),
  gateway: "https://ar.io",
};

export const mockedTurboClient = {
  uploadFile: jest.fn(() => ({ id: 'arweave-tx-id' })),
};

export const mockedFileData = {
  ext: '.JPEG',
  buffer: Buffer.from('file buffer information'),
  mime: 'image/jpeg',
  name: 'people coding.JPEG',
  hash: '4l0ngH45h',
  path: '/tmp/strapi',
  size: 985.43,
  sizeInBytes: 98543,
  url: '43-character-arweave-tx-id',
};

export const mockedFileStreamData = {
  ext: '.JPEG',
  buffer: Buffer.from('file buffer information'),
  mime: 'image/jpeg',
  name: 'people coding.JPEG',
  hash: '4l0ngH45h',
  path: '/tmp/strapi',
  size: 985.43,
  sizeInBytes: 98543,
  url: '43-character-arweave-tx-id',
  stream: Readable.from(Buffer.from('file buffer information')) as unknown as ReadStream,
};

export const mockedBigFileData = {
  ext: '.JPEG',
  buffer: Buffer.alloc(1024 * 1024), // 1 MB buffer
  mime: 'image/jpeg',
  name: 'big_img.JPEG',
  hash: '4l0ngH45h',
  path: '/tmp/strapi',
  size: 1048576,
  sizeInBytes: 1048576,
  url: '43-character-arweave-tx-id',
};