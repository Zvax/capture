import {getXhr} from './index';
const objectToFormData = (object) => {
  let data = new FormData;
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      data.append(key, object[key]);
    }
  }
  return data;
};
const http = ( (getXhr, objectToFormData) => {
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
    },
    post: (url, data, callable) => {
      if (typeof data !== FormData) {
        data = objectToFormData(data);
      }
      let xhr = getXhr();
      xhr.onload = () => {
        if (callable !== undefined) {
          callable(xhr.responseText, xhr.status);
        }
      };
      xhr.open('POST', url);
      xhr.send(data);
    },
    put: (url, data, callable) => {
      let xhr = getXhr();
      xhr.onload = () => {
        if (callable !== undefined) {
          callable(xhr.responseText, xhr.status);
        }
      };
      xhr.open('PUT', url);
      xhr.send(JSON.stringify(data));
    },
  };
})(getXhr, objectToFormData);
export default http;
