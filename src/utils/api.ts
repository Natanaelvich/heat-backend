import axios from 'axios';

const GITHUB_API_URL = process.env.GITHUB_API_URL;

const api = axios.create({
  baseURL: GITHUB_API_URL,
});

export { api };