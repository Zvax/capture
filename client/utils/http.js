import {getXhr} from './index'
const http = ( (getXhr) => {
  return {
    makeRequest: (method, url, next) => {
      let xhr = getXhr();
      xhr.onload = () => {
        if (next) {
          next(xhr.response, xhr.status);
        }
      };
      xhr.open(method, url);
      xhr.send();
    }
  };
})(getXhr);
export default http;
