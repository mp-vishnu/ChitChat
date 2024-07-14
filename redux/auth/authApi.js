// src/user/userApi.js
export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://192.168.1.70:8000/auth/signup', {
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
      const response = await fetch('http://192.168.1.70:8000/auth/login', {
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
      const response = await fetch(`http://192.168.1.70:8000/users/${userId}`, {
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
      const response = await fetch('http://192.168.1.70:8000/users/request', {
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

export function getRequest(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://192.168.1.70:8000/users/getrequest/${userId}`,
        {
          method: 'GET',
          headers: {'content-type': 'application/json'},
        },
      );
      if (response.ok) {
        const data = await response.json();
        console.log('getRequestapi <><><> ', data);
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
export function acceptRequest(reqInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        'http://192.168.1.70:8000/users/acceptrequest',
        {
          method: 'POST',
          body: JSON.stringify(reqInfo),
          headers: {'content-type': 'application/json'},
        },
      );
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
export function getAllFriends(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://192.168.1.70:8000/users/friends/${userId}`,
        {
          method: 'GET',
          headers: {'content-type': 'application/json'},
        },
      );
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

export function sendMessage(msgInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://192.168.1.70:8000/msg/send', {
        method: 'POST',
        body: JSON.stringify(msgInfo),
        headers: {'content-type': 'application/json'},
      });
      if (response.ok) {
        const data = await response.json();
        console.log('api <><><> ', data);

        // Emit the message via socket
        socket.emit('sendMessage', {
          senderId: msgInfo.senderId,
          receiverId: msgInfo.receiverId,
          message: msgInfo.message,
        });

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

export function fetchMessage(senderId, receiverId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://192.168.1.70:8000/msg/fetch?senderId=${senderId}&receiverId=${receiverId}`,
        {
          method: 'GET',
          headers: {'content-type': 'application/json'},
        },
      );
      if (response.ok) {
        const data = await response.json();
        console.log('api <><><> ', data);
        //return data;
        resolve({data}); // Correctly resolve the promise
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
