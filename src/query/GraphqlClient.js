import React, {useContext} from 'react';
import {Alert} from 'react-native';
import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import SInfo  from 'react-native-sensitive-info';
import {AuthContext} from '../providers/AuthenticationProvider';

import * as SecureStore from 'expo-secure-store';

// const httpLink = createHttpLink({uri: 'https://dots-api-test.dotsco.re/graphql'});
const httpLink = createHttpLink({uri: 'https://x8cgfzvm-8080.asse.devtunnels.ms/graphql'});
// const httpLink = createHttpLink({uri: process.env.API_URL + '/graphql'});

const createLogoutLink = (logout) => {
    return new onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ extensions }) => {
          if (extensions?.code === 'UNAUTHENTICATED') {
            Alert.alert(
              'Sesi anda telah habis',
              'Silahkan login kembali!',
              [
                { text: "Login", onPress: logout},
              ], 
              { cancelable: false }
            );
          }
        }
      );
    }  
  })
};

const AuthLink = setContext(async (_, {headers}) => {
  const userStr =  await SecureStore.getItemAsync('authInfo');
  const user = JSON.parse(userStr);
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${user.accessToken}`,
    },
  };
});

export const createGraphqlClient = () => { 
  const {logout} = useContext(AuthContext);
  const logoutLink = createLogoutLink(logout);
    return new ApolloClient({
    link: AuthLink.concat(logoutLink.concat(httpLink)),
    cache: new InMemoryCache(),
  })
};
