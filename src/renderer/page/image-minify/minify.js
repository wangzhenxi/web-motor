
import Https from 'https';
import Url from 'url';
import fs from 'fs';
import figures from 'figures';

const TINYIMG_URL = 'tinypng.com';

function getRandomHeader() {
  // 随机IP
  const ip = new Array(4).fill(0).map(() => Math.floor(Math.random() * 255)).join('.');

  return {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Postman-Token': Date.now(),
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
      'X-Forwarded-For': ip,
    },
    hostname: TINYIMG_URL,
    method: 'POST',
    path: '/web/shrink',
    rejectUnauthorized: false,
  };
}

function uploadImg(file) {
  const opts = getRandomHeader();
  return new Promise((resolve, reject) => {
    const req = Https.request(opts, (res) => {
      res.on('data', (data) => {
        const obj = JSON.parse(data.toString());
        resolve(obj);
      });
    });
    req.write(file, 'binary');
    req.on('error', e => reject(e));
    req.end();
  });
}

function downloadImg(url) {
  const opts = new Url.URL(url);
  return new Promise((resolve, reject) => {
    const req = Https.request(opts, (res) => {
      let file = '';
      res.setEncoding('binary');
      res.on('data', (chunk) => {
        file += chunk;
      });
      res.on('end', () => resolve(file));
    });
    req.on('error', e => reject(e));
    req.end();
  });
}

async function compressImg(filepath) {
  const res = {
    code: 0,
    msg: '',
    data: '',
  };
  try {
    const file = fs.readFileSync(filepath, 'binary');
    const obj = await uploadImg(file);
    const data = await downloadImg(obj.output.url);
    const oldSize = obj.input.size;
    const newSize = obj.output.size;
    const ratio = 1 - obj.output.ratio;
    const msg = `${figures.tick} Compressed [${filepath}] completed: Old Size ${oldSize}, New Size ${newSize}, Optimization Ratio ${ratio}`;
    Object.assign(res, {
      data,
      msg,
    });
  } catch (err) {
    const msg = `${figures.cross} Compressed [${filepath}] failed: ${err}`;
    Object.assign(res, {
      code: 500,
      msg,
    });
  }
  return res;
}

async function minify(filepaths = []) {
  const files = await Promise.all(filepaths.map(async (filepath) => {
    // 压缩
    const res = await compressImg(filepath);
    // 输出日志
    console.log(res.msg);
    return res;
  }));

  return files;
}

export { minify };
