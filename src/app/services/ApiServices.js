import { environment } from './../../environments/development'
export class ApiServices {

  BASE_URL = environment;

  /**
   * Build the destination URL for any services
   * @param {String} endpoint - Target file 
   * @returns {String} - Destination URL
   */
  getFullApiUrl(endpoint) {
    return `${this.BASE_URL.apiUrl + endpoint}`;
  }

  async checkToken(token = null) {
    const tokenToUse = token;
    if (!tokenToUse) throw new Error('Token is required');

    const url = this.getFullApiUrl('/auth/validate-token');
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenToUse}`
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error (status: ${response.status}, ${errorText})`);
    }

    return await response.json();
  }
  /**
   * Call the API to verify data during a login.
   * @param {String} identifier - User account identifier (email/username).
   * @param {String} password - User password.
   * @returns {Promise<Object|String>} - A JSON with the response from the API. A string with the error message indicated by the API.
   * @throws {Error} - When an error occurs in the current request.
   */
  async login(identifier, password) {
    try {
      const API = this.getFullApiUrl('/auth/login');
      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identifier,
          password
        })
      });
      const data = await response.json();

      if (!data.status) return data.message;

      return data;
    } catch (error) {
      console.log("An error has ocurred in login service: ", error);
      throw error;
    }
  }

  /**
   * Sends user data to the API for registration.
   * @param {Object} data - The user data for registration.
   * @returns {Promise<Object|String>} A JSON with the response from the API or a string with an error message.
   * @throws {Error} When an error occurs in the request.
   */
  async register(data) {
    try {
      const API = this.getFullApiUrl('/auth/register');
      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const data = await response.json();
      if (!data.status) return data.message;

      return data;
    } catch (error) {
      console.log("An error has ocurred in register service: ", error);
      throw error;
    }
  }

  /**
   * Fetches all users from the API.
   * @param {String} token - The authentication token for authorization.
   * @returns {Promise<Object>} The API response, typically a list of users.
   * @throws {Error} When an error occurs in the request.
   */
  async getUsers(token) {
    try {
      const API = this.getFullApiUrl('/users/');
      const response = await fetch(API, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("An error has occurred in getUsers service: ", error);
      throw error;
    }
  }

  /**
   * Fetches a single user by their ID from the API.
   * @param {String} token - The authentication token for authorization.
   * @param {String|Number} id - The ID of the user to fetch.
   * @returns {Promise<Object>} The API response, typically the user data.
   * @throws {Error} When an error occurs in the request.
   */
  async getUserById(token, id) {
    try {
      const API = this.getFullApiUrl(`/users/${id}`);
      const response = await fetch(API, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("An error has occurred in getUserById service: ", error);
      throw error;
    }
  }

  /**
   * Creates a new user via the API.
   * @param {String} token - The authentication token for authorization.
   * @param {Object} userData - The data for the new user.
   * @returns {Promise<Object>} The API response, typically the created user data.
   * @throws {Error} When an error occurs in the request.
   */
  async createUser(token, userData) {
    try {
      const API = this.getFullApiUrl('/users/');
      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("An error has occurred in createUser service: ", error);
      throw error;
    }
  }

  /**
   * Updates a user's data using the PUT method.
   * @param {String} token - The authentication token for authorization.
   * @param {String|Number} id - The ID of the user to update.
   * @param {Object} userData - The new data for the user.
   * @returns {Promise<Object>} The API response.
   * @throws {Error} When an error occurs in the request.
   */
  async updateUserPut(token, id, userData) {
    try {
      const API = this.getFullApiUrl(`/users/${id}`);
      const response = await fetch(API, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("An error has occurred in updateUserPut service: ", error);
      throw error;
    }
  }

  /**
   * Partially updates a user's data using the PATCH method.
   * @param {String} token - The authentication token for authorization.
   * @param {String|Number} id - The ID of the user to update.
   * @param {Object} userData - The fields to update.
   * @returns {Promise<Object>} The API response.
   * @throws {Error} When an error occurs in the request.
   */
  async updateUserPatch(token, id, userData) {
    try {
      const API = this.getFullApiUrl(`/users/${id}`);
      const response = await fetch(API, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("An error has occurred in updateUserPatch service: ", error);
      throw error;
    }
  }

  /**
   * Deletes a user by their ID via the API.
   * @param {String} token - The authentication token for authorization.
   * @param {String|Number} id - The ID of the user to delete.
   * @returns {Promise<Object>} The API response.
   * @throws {Error} When an error occurs in the request.
   */
  async deleteUser(token, id) {
    try {
      const API = this.getFullApiUrl(`/users/${id}`);
      const response = await fetch(API, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("An error has occurred in deleteUser service: ", error);
      throw error;
    }
  }
}