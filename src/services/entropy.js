import { SQLite, Constants, Gyroscope, MagnetometerUncalibrated } from 'expo';
import shajs from 'sha.js';
import { Generator } from 'more-entropy';

const sha256 = data => shajs('sha256').update(data).digest('hex');

const sqlite = () =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase('_rnd', 0, '', 1);
    db.transaction((tx) => {
      tx.executeSql('SELECT lower(hex(randomblob(32))) as rnd;', [], (_, res) => {
        resolve(res.rows.item(0).rnd);
      }, (_, err) => {
        reject(err);
      });
    });
  });

const mathRandom = () =>
  new Promise((resolve) => {
    const arr = [];
    for (let i = 0; i < 32; i += 1) {
      arr.push(Math.floor(Math.random() * 256));
    }
    resolve(sha256(JSON.stringify(arr)));
  });

const deviceProperties = () =>
  new Promise((resolve) => {
    resolve(sha256(sha256(JSON.stringify([
      Constants.deviceId,
      Constants.deviceName,
      Constants.sessionId,
      Constants.systemFonts,
      Constants.manifest,
      (new Date()).getTime(),
    ]))));
  });

const giroscope = () =>
  new Promise((resolve) => {
    let entropy = '';
    const subscription = Gyroscope.addListener((pos) => {
      entropy = sha256(JSON.stringify([entropy, pos]));
    });
    Gyroscope.setUpdateInterval(16);

    setTimeout(() => {
      Gyroscope.setUpdateInterval(10000);
      subscription.remove();
      resolve(sha256(entropy));
    }, 500);
  });

const magnetometer = () =>
  new Promise((resolve) => {
    let entropy = '';
    const subscription = MagnetometerUncalibrated.addListener((pos) => {
      entropy = sha256(JSON.stringify([entropy, pos]));
    });
    Gyroscope.setUpdateInterval(16);

    setTimeout(() => {
      Gyroscope.setUpdateInterval(10000);
      subscription.remove();
      resolve(sha256(entropy));
    }, 500);
  });

const cpuTiming = () =>
  new Promise((resolve) => {
    (new Generator({ auto_stop_bits: 128 })).generate(128, (values) => {
      resolve(sha256(values));
    });
  });

export default async() =>
  sha256(JSON.stringify(await Promise.all([
    mathRandom(),
    sqlite(),
    deviceProperties(),
    giroscope(),
    magnetometer(),
    cpuTiming(),
  ]))).substring(0, 32);
