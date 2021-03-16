import fs from 'fs';

async function readdir(path) {
  const dirs = await fs.readdirSync(path);
  return dirs;
}

async function isDirectory(path) {
  const stat = await fs.statSync(path);
  const flag = stat.isDirectory();
  return flag;
}


async function writeFile(source, data, option) {
  await fs.writeFileSync(source, data, option);
}

export {
  readdir,
  isDirectory,
  writeFile,
};
