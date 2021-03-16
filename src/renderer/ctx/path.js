import * as path from 'path';

function join() {
  return path.join(...arguments);
}
function extname(p) {
  return path.extname(p);
}

export {
  join,
  extname,
};
