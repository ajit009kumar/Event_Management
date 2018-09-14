import fetch from 'isomorphic-fetch';

/**
 * Wrapper method for posting data to an endpoint.
 * @param {string} endPoint - end point to post the data
 * @param {object} data - json data to be posted
 * @param {object} headers - additional headers to be added in the request
 */
export const post = (endPoint, data, headers = {}, isFormData = false) =>
  fetch(endPoint, {
    method: 'POST',
    headers: {
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...headers,
    },
    body: isFormData ? data : JSON.stringify(data),
  })
    .then(response => response.json())
    .then(
      responseData =>
        new Promise((resolve, reject) => {
          const { success } = responseData;
          if (success) {
            resolve(responseData);
          } else {
            const { errors } = responseData;
            reject({errors });
          }
        }),
    );

export const put = (endPoint, data, headers = {}, isFormData = false) =>
  fetch(endPoint, {
    method: 'PUT',
    headers: {
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...headers,
    },    
    body: JSON.stringify(data),
  })
    // Irrespective of the response, convert the data into JSON
    .then(response => response.json())
    .then(
      responseData =>
        new Promise((resolve, reject) => {
          // Check if there is error in the responseData
          const { success } = responseData;
          if (success) {
            // Else resolve with responseData
            resolve(responseData);
          } else {
            const { errors } = responseData;
            // In case of error, reject with returning error and errorCode
            reject({ errors });
          }
        }),
    );

export const get = (endPoint, headers = {}) =>
  fetch(endPoint, {
    headers,
  })
    .then(response => response.json())
    .then(
      responseData =>
        new Promise((resolve, reject) => {
          // Check if there is error in the responseData
          const { success } = responseData;
          if (success) {
            // Else resolve with responseData
            resolve(responseData);
          } else {
            const { errors } = responseData;
            // In case of error, reject with returning error and errorCode
            reject({ errors });
          }
        }),
    );
