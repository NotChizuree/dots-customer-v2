import React from 'react';
import axios from 'axios';

const RestClient = axios.create({
  baseURL: 'http://192.168.18.100:5000',
  // baseURL: process.env.API_URL,
  timeout: 10000,
});

export default RestClient;
