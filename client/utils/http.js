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
    get: (url, next) => {
      let xhr = getXhr();
      xhr.onload = () => {
        if (next) {
          next(xhr.response, xhr.status);
        }
      };
      xhr.open('GET', url);
      xhr.send();
    },
    post: (url, data, next) => {
      let xhr = getXhr();
      xhr.onload = () => {
        if (next !== undefined) {
          next(xhr.responseText, xhr.status);
        }
      };
      xhr.open('POST', url);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(JSON.stringify(data));
    },
    put: (url, data, next) => {
      let xhr = getXhr();
      xhr.onload = () => {
        if (next !== undefined) {
          next(xhr.responseText, xhr.status);
        }
      };
      xhr.open('PUT', url);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(JSON.stringify(data));
    },
    patch: (url, data, next) => {
      let xhr = getXhr();
      xhr.onload = () => {
        if (next !== undefined) {
          next(xhr.responseText, xhr.status);
        }
      };
      xhr.open('PATCH', url);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(JSON.stringify(data));
    },
  };
})(getXhr, objectToFormData);
export default http;
