
import { that } from '../share/that';

const url = {};

url.toLink = (link) => {
  console.log(that);
  that.$electron.shell.openExternal(link);
};

export default url;
