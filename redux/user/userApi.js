// src/user/userApi.js

export function createUser(userData) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/auth/signup', {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: { 'content-type': 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          resolve({ data });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  
  export function loginUser(loginInfo) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/auth/login', {
          method: 'POST',
          body: JSON.stringify(loginInfo),
          headers: { 'content-type': 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          resolve({ data });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  