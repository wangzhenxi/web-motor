import * as path from 'path';

function join(...params) {
  return path.join(...params);
}
function extname(p) {
  return path.extname(p);
}

export {
  join,
  extname,
};
