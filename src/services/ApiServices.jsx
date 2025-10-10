import { environment } from '../environments/development'
export class ApiServices {

  BASE_URL = environment;

  constructor() {
    this._token = null;
  }

  /**
   * Build the destination URL for any services
   * @param {String} endpoint - Target file 
   * @returns {String} - Destination URL
   */
  getFullApiUrl(endpoint) {
    return `${this.BASE_URL.apiUrl + endpoint}`;
  }

  // Establecer el token actual
  setToken(token) {
    this._token = token;
  }

  // Obtener el token actual
  getToken() {
    return this._token;
  }

  async checkToken() {
    const token = this.getToken();
    if (!token) {
      console.warn('checkToken called but no token available');
      return { status: false, message: 'No token available' };
    }

    const url = this.getFullApiUrl('/auth/validate-token');

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error (status: ${response.status}, ${errorText})`);
      }
      return await response.json();
    } catch (error) {
      console.error('An error has ocurred in auth token service:', error);
      throw error;
    }
  }


  /**
   * Call the API to verify data during a login.
   * @param {String} identifier - User account identifier (email/username).
   * @param {String} password - User password.
   * @returns {Promise<Object|String>} - A JSON with the response from the API. A string with the error message indicated by the API.
   * @throws {Error} - When an error occurs in the current request.
   */
  async login(identifier, password) {
    const param = new URLSearchParams();
    param.append("identifier", identifier);
    param.append("password", password);

    try {
      const API = this.getFullApiUrl('/auth/login');
      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: param.toString()
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
    const param = new URLSearchParams();

    param.append("first_name", data.first_name);
    param.append("last_name", data.last_name);
    param.append("nickname", data.nickname);
    param.append("email", data.email);
    param.append("password", data.password);
    param.append("currency", 'null');
    param.append("photo", 'null');
    param.append("status", 1);

    try {
      const API = this.getFullApiUrl('/auth/register');
      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: param.toString()
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
          'Content-Type': 'application/x-www-form-urlencoded',
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
          'Content-Type': 'application/x-www-form-urlencoded',
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
          'Content-Type': 'application/x-www-form-urlencoded',
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
          'Content-Type': 'application/x-www-form-urlencoded',
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
          'Content-Type': 'application/x-www-form-urlencoded',
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
          'Content-Type': 'application/x-www-form-urlencoded',
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

  /**
   * Fetches all goals from the API.
   * @param {String} token - The authentication token for authorization.
   * @returns {Promise<Object>} The API response, typically a list of goals.
   * @throws {Error} When an error occurs in the request.
   */
  async getGoals(token) {
    try {
      const API = this.getFullApiUrl('/goals/');
      const response = await fetch(API, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("An error has occurred in getGoals service: ", error);
      throw error;
    }
  }

  /**
   * Fetches all goals for a specific user by their user ID from the API.
   * @param {String|Number} userId - The ID of the user whose goals are to be fetched.
   * @returns {Promise<Object>} The API response, typically a list of goals for the specified user.
   * @throws {Error} When an error occurs in the request.
   */
  async getGoalsByUserId(userId) {
    const token = this.getToken();
    try {
      const API = this.getFullApiUrl(`/goals/user/${userId}`);
      const response = await fetch(API, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("An error has occurred in getGoalsByUserId service: ", error);
      throw error;
    }
  }

  /**
   * Fetches a single goal by its ID from the API.
   * @param {String} token - The authentication token for authorization.
   * @param {String|Number} id - The ID of the goal to fetch.
   * @returns {Promise<Object>} The API response, typically the goal data.
   * @throws {Error} When an error occurs in the request.
   */
  async getGoalById(token, id) {
    try {
      const API = this.getFullApiUrl(`/goals/${id}`);
      const response = await fetch(API, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("An error has occurred in getGoalById service: ", error);
      throw error;
    }
  }

  /**
   * Creates a new goal via the API.
   * @param {String} token - The authentication token for authorization.
   * @param {Object} goalData - The data for the new goal.
   * @returns {Promise<Object>} The API response, typically the created goal data.
   * @throws {Error} When an error occurs in the request.
   */
  async createGoal(token, goalData) {
    const param = new URLSearchParams();
    param.append("name", goalData.name);
    param.append("amount", goalData.amount);
    param.append("estimated_date", goalData.estimated_date);
    param.append("user_id", goalData.user_id);

    try {
      const API = this.getFullApiUrl('/goals/');
      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        },
        body: param.toString()
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("An error has occurred in createGoal service: ", error);
      throw error;
    }
  }

  /**
   * Updates a goal's data using the PUT method.
   * @param {String} token - The authentication token for authorization.
   * @param {String|Number} id - The ID of the goal to update.
   * @param {Object} goalData - The new data for the goal.
   * @returns {Promise<Object>} The API response.
   * @throws {Error} When an error occurs in the request.
   */  async updateGoalPut(token, id, goalData) {
    try {
      const API = this.getFullApiUrl(`/goals/${id}`);
      const response = await fetch(API, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(goalData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("An error has occurred in updateGoalPut service: ", error);
      throw error;
    }
  }

  /**
   * Partially updates a goal's data using the PATCH method.
   * @param {String} token - The authentication token for authorization.
   * @param {String|Number} id - The ID of the goal to update.
   * @param {Object} goalData - The fields to update.
   * @returns {Promise<Object>} The API response.
   * @throws {Error} When an error occurs in the request.
   */
  async updateGoalPatch(token, id, goalData) {
    try {
      const API = this.getFullApiUrl(`/goals/${id}`);
      const response = await fetch(API, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(goalData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("An error has occurred in updateGoalPatch service: ", error);
      throw error;
    }
  }
    /**
     * Deletes a goal by its ID via the API.
     * @param {String} token - The authentication token for authorization.
     * @param {String|Number} id - The ID of the goal to delete.
     * @returns {Promise<Object>} The API response.
     * @throws {Error} When an error occurs in the request.
     */
    async deleteGoal(token, id) {
      try {
        const API = this.getFullApiUrl(`/goals/${id}`);
        const response = await fetch(API, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.log("An error has occurred in deleteGoal service: ", error);
        throw error;
      }
    }
  
    /**
     * Fetches all savings from the API.
     * @param {String} token - The authentication token for authorization.
     * @returns {Promise<Object>} The API response, typically a list of savings.
     * @throws {Error} When an error occurs in the request.
     */
    async getSavings(token) {
      try {
        const API = this.getFullApiUrl('/savings/');
        const response = await fetch(API, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.log("An error has occurred in getSavings service: ", error);
        throw error;
      }
    }
  
    /**
     * Fetches all savings for a specific goal by its goal ID from the API.
     * @param {String} token - The authentication token for authorization.
     * @param {String|Number} goalId - The ID of the goal whose savings are to be fetched.
     * @returns {Promise<Object>} The API response, typically a list of savings for the specified goal.
     * @throws {Error} When an error occurs in the request.
     */
    async getSavingsByGoalId(goalId) {
      const token = this.getToken();
      try {
        const API = this.getFullApiUrl(`/savings/goal/${goalId}`);
        const response = await fetch(API, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.log("An error has occurred in getSavingsByGoalId service: ", error);
        throw error;
      }
    }
  
    /**
     * Fetches a single saving by its ID from the API.
     * @param {String} token - The authentication token for authorization.
     * @param {String|Number} id - The ID of the saving to fetch.
     * @returns {Promise<Object>} The API response, typically the saving data.
     * @throws {Error} When an error occurs in the request.
     */
    async getSavingById(token, id) {
      try {
        const API = this.getFullApiUrl(`/savings/${id}`);
        const response = await fetch(API, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.log("An error has occurred in getSavingById service: ", error);
        throw error;
      }
    }
  
    /**
     * Creates a new saving via the API.
     * @param {String} token - The authentication token for authorization.
     * @param {Object} savingData - The data for the new saving.
     * @returns {Promise<Object>} The API response, typically the created saving data.
     * @throws {Error} When an error occurs in the request.
     */
    async createSaving(token, savingData) {
      const param = new URLSearchParams();
      param.append("name", savingData.name);
      param.append("amount", savingData.amount);
      param.append("goal_id", savingData.goal_id);
  
      try {
        const API = this.getFullApiUrl('/savings/');
        const response = await fetch(API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
          },
          body: param.toString()
        });
        
        const data = await response.json();
        return data;
      }  catch (error) {
        console.log("An error has occurred in createSaving service: ", error);
        throw error;
      }
    }
  
    /**
     * Updates a saving's data using the PUT method.
     * @param {String} token - The authentication token for authorization.
     * @param {String|Number} id - The ID of the saving to update.
     * @param {Object} savingData - The new data for the saving.
     * @returns {Promise<Object>} The API response.
     * @throws {Error} When an error occurs in the request.
     */
    async updateSavingPut(token, id, savingData) {
      try {
        const API = this.getFullApiUrl(`/savings/${id}`);
        const response = await fetch(API, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(savingData)
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.log("An error has occurred in updateSavingPut service: ", error);
        throw error;
      }
    }
  
    /**
     * Partially updates a saving's data using the PATCH method.
     * @param {String} token - The authentication token for authorization.
     * @param {String|Number} id - The ID of the saving to update.
     * @param {Object} savingData - The fields to update.
     * @returns {Promise<Object>} The API response.
     * @throws {Error} When an error occurs in the request.
     */
    async updateSavingPatch(token, id, savingData) {
      try {
        const API = this.getFullApiUrl(`/savings/${id}`);
        const response = await fetch(API, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(savingData)
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.log("An error has occurred in updateSavingPatch service: ", error);
        throw error;
      }
    }
  
    /**
     * Deletes a saving by its ID via the API.
     * @param {String} token - The authentication token for authorization.
     * @param {String|Number} id - The ID of the saving to delete.
     * @returns {Promise<Object>} The API response.
     * @throws {Error} When an error occurs in the request.
     */
    async deleteSaving(token, id) {
      try {
        const API = this.getFullApiUrl(`/savings/${id}`);
        const response = await fetch(API, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.log("An error has occurred in deleteSaving service: ", error);
        throw error;
      }
    }
  }
