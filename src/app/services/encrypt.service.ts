/** @format */

import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import * as CryptoJs from 'crypto-js';

@Injectable()
export class EncryptService {
  constructor() {}

  public static encrypt(value: string) {
    const key = CryptoJs.enc.Utf8.parse(environment.authkey);
    let ciphertext = CryptoJs.AES.encrypt(value, key, { iv: key }).toString();
    return ciphertext;
  }
  public static decrypt(value: string) {
    const key = CryptoJs.enc.Utf8.parse(environment.authkey);
    let originalText = CryptoJs.AES.decrypt(value, key, { iv: key }).toString(CryptoJs.enc.Utf8);
    return originalText;
  }
}
