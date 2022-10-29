const CryptoJS = require("crypto-js");

export class Encrypter {
  encryptionKey: string;

  constructor(encryptionKey: string) {
    console.log("create encrypter", encryptionKey);
    this.encryptionKey = encryptionKey;
  }

  encrypt(clearText: string) {
    return CryptoJS.AES.encrypt(clearText, this.encryptionKey).toString();
  }

  decrypt(encryptedText: string) {
    const bytes = CryptoJS.AES.decrypt(encryptedText, this.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
