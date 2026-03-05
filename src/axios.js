
import axios from 'axios'

axios.defaults.withCredentials = true;

const hostname = window.location.hostname;
if (hostname === 'hmcam.espacecameroun.com') {
  axios.defaults.baseURL = 'https://homecameroon.espacecameroun.com';
} else {
  axios.defaults.baseURL = 'http://localhost:8000';
}


export default axios
