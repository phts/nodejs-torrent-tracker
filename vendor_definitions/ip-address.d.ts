declare interface BigInteger {}

declare module 'ip-address' {

  var Address4: {
    new(address: string): Address4;
    fromBigInteger(bigInteger: BigInteger): Address4;
    fromHex(hex: string): Address4;
    fromInteger(integer: number): Address4;
  }

  interface Address4 {
    bigInteger(args?: any): any;
    binaryZeroPad(args?: any): any;
    correctForm(args?: any): any;
    endAddress(args?: any): any;
    getBitsBase2(args?: any): any;
    isCorrect(args?: any): any;
    isInSubnet(args?: any): any;
    isValid(args?: any): any;
    mask(args?: any): any;
    startAddress(args?: any): any;
    toArray(args?: any): any;
    toGroup6(args?: any): any;
    toHex(args?: any): any;
  }

  var Address6: {
    RE_BAD_ADDRESS;
    RE_BAD_CHARACTERS;
    RE_SUBNET_STRING;
    RE_ZONE_STRING;
    SCOPES;
    TYPES;

    new(address: string, groups?: number): Address6;
    fromAddress4(address: string): Address6;
    fromBigInteger(bigInteger: BigInteger): Address6;
    fromByteArray(bytes: number[]): Address6;
    fromURL(url: string): Address6;
    fromUnsignedByteArray(bytes: number[]): Address6;
  }

  interface Address6 {
    bigInteger(args?: any): any;
    binaryZeroPad(args?: any): any;
    canonicalForm(args?: any): any;
    correctForm(args?: any): any;
    decimal(args?: any): any;
    endAddress(args?: any): any;
    getBits(args?: any): any;
    getBitsBase16(args?: any): any;
    getBitsBase2(args?: any): any;
    getBitsPastSubnet(args?: any): any;
    getScope(args?: any): any;
    getType(args?: any): any;
    inspect6to4(args?: any): any;
    inspectTeredo(args?: any): any;
    is4(args?: any): any;
    is6to4(args?: any): any;
    isCanonical(args?: any): any;
    isCorrect(args?: any): any;
    isInSubnet(args?: any): any;
    isLinkLocal(args?: any): any;
    isLoopback(args?: any): any;
    isMulticast(args?: any): any;
    isTeredo(args?: any): any;
    isValid(args?: any): any;
    mask(args?: any): any;
    microsoftTranscription(args?: any): any;
    possibleSubnets(args?: any): any;
    regularExpression(args?: any): any;
    regularExpressionString(args?: any): any;
    reverseForm(args?: any): any;
    startAddress(args?: any): any;
    to4(args?: any): any;
    to4in6(args?: any): any;
    to6to4(args?: any): any;
    toByteArray(args?: any): any;
    toUnsignedByteArray(args?: any): any;
  }
}
