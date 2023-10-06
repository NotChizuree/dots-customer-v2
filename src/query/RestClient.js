import React from 'react';
import axios from 'axios';

const RestClient = axios.create({
  // baseURL: 'https://dots-api-test.dotsco.re',
  baseURL: 'https://x8cgfzvm-8080.asse.devtunnels.ms',
  // baseURL: process.env.API_URL,
  timeout: 10000,
});

export default RestClient;
