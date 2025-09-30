import { User } from '../types/';

/**
 * get current user from the list by get item have flag isCurrent on
 */
export const getCurrentUser = (users: User[]): User => {
  // use type assertion to make {} is a User
  let currentUser = {} as User;

  for(let i = 0, length = users.length; i < length; i ++) {
    if (users[i].isCurrent) {
      currentUser = users[i];
      return currentUser;
    }
  }

  return currentUser;
}

/**
 * get all action attribute have value is true - mean on loading
 * @param obj contain action loading with its flag
 */
export const getLoadingAction = (loading: {}) => {
  let keys = Object.keys(loading);
  let result: string[] = [];

  if (keys.length) {
    keys.forEach((key: string) => {
      if (loading[key]) {
        result.push(key);
      }
    });
    return result;
  } else {
    return [];
  }
}

/**
 * filter all error message valid
 * @param error: obj contain action error with error message
 */
export const getError = (error: {}) => {
  let keys = Object.keys(error);

  if (keys.length) {
    keys.forEach((key: string) => {
      if (!error[key]) {
        delete error[key]
      }
    });
  }

  return error;
}

export const validateEmail = (email: string) => {
  if (!email) return false;

  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email.toLowerCase());
}

export const validateUrl = (url: string) => {
  if (!url) return false;

  var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  return regex.test(url);
}