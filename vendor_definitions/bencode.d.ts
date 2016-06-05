declare module 'bencode' {
  function encode(data: any, buffer?: Buffer, offset?: number): Buffer;
  function decode(data: Buffer, start?: number, end?: number, encoding?: string): any;
  function byteLength(value: any): number;
  function encodingLength(value: any): number;
}
