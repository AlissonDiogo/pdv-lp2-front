import axios from "axios";

const axiosAPI = axios.create({
    baseURL: "http://localhost:8081/"
});

const apiReq = (method, uri, data) => {
    return axiosAPI({
        method,
        url: uri,
        data,
      }).then(res => {
        return Promise.resolve(res.data);
      })
      .catch(err => {
        return Promise.reject(err);
      });
};

const get = (uri, data) => apiReq("get", uri, data);
const dilete = (uri, data) =>  apiReq("delete", uri, data);
const post = (uri, data) => apiReq("post", uri, data);

const api ={
  get,
  dilete,
  post,
};

export default api;