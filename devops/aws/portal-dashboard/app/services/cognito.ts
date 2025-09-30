
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.NEXT_USER_POOL_ID || 'us-east-1_XBr3ISs3I',
  ClientId: process.env.NEXT_USER_POOL_CLIENT_ID || '5sgor5aetq2mfgu7prco0mn985',
};

export const userPool = new CognitoUserPool(poolData);

export const getUserToken = () => {
  const authUser = userPool.getCurrentUser();
  if (authUser) {
    const keyPrefix = authUser.keyPrefix;
    const keyIdToken = `${keyPrefix}.${authUser.username}.idToken`;
    const idToken = authUser.storage[keyIdToken];
    console.log('idToken', idToken)
    return idToken;
  }
} 
