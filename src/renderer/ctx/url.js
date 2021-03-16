
import { that } from '../share/that';

const url = {};

url.toLink = (link) => {
  that.$electron.shell.openExternal(link);
};

export default url;
