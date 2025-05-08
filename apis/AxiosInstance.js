import axios from 'axios';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig.extra.BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default instance;
