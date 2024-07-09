// src/user/userApi.js
export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8000/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {'Content-Type': 'application/json'},
      });

      if (response.ok) {
        const data = await response.json();
        resolve(data); // Directly resolve with the response data
      } else {
        const error = await response.json(); // Adjusted to parse JSON error
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
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: {'content-type': 'application/json'},
      });
      if (response.ok) {
        const data = await response.json();
        console.log('api <><><> ', data);
        resolve({data});
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function getAllUser(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: 'GET',
        headers: {'content-type': 'application/json'},
      });
      if (response.ok) {
        const data = await response.json();
        console.log('api <><><> ', data);
        resolve({data});
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function sendRequest(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8000/users/request', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {'content-type': 'application/json'},
      });
      if (response.ok) {
        const data = await response.json();
        console.log('api <><><> ', data);
        resolve({data});
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
