import {Address4} from 'ip-address';
import {Address6} from 'ip-address';

export default class Address {
  private addr4: any;
  private addr6: any;

  constructor(addr: string) {
    var addr4 = new Address4(addr);
    if (!addr4.isValid()) {
      var addr6 = new Address6(addr);
      if (!addr6.isValid()) {
        throw new Error('Invalid ip address');
      } else {
        this.addr6 = addr6;
      }
    } else {
      this.addr4 = addr4;
    }
  }

  toNumber() {
    var addr4 = this.addr4 ? this.addr4 : this.addr6.to4();
    return Buffer.from(addr4.toArray()).readInt32BE(0);
  }

  toString() {
    return this.addr().address;
  }

  private addr() {
    return this.addr4 ? this.addr4 : this.addr6;
  }
}
