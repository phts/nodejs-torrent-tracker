declare module 'bufferpack' {
  function unpack(format: string, buffer: Buffer, position: number): Object | any[];
  function packTo(format: string, buffer: Buffer, position: number, values: number[]): Buffer | boolean;
  function pack(format: string, values: any[]): Buffer | boolean;
  function calcLength(format: string, values: any[]): number;
}
