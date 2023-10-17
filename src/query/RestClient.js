import React from 'react';
import axios from 'axios';

const RestClient = axios.create({
  // baseURL: 'https://dots-api-test.dotsco.re',
  baseURL: 'http://192.168.18.100:8000/api',            
  // baseURL: process.env.API_URL,
  timeout: 10000,
});

export default RestClient;
