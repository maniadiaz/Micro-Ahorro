import { ApiSettings } from './../../ApiSettingsTypedef';

export class ApiServices {

  BASE_URL = ApiSettings;

  /**
   * Build the destination URL for any services
   * @param {String} endpoint - Target file 
   * @returns {String} - Destination URL
   */
  getFullApiUrl(endpoint) {
    return `${this.BASE_URL.BaseApiUrl + endpoint}`;
  }

  getSession() {
    return {
      toke: '2',
      sid: '1',
      name: 'test'
    };
  }

  async checkToken() {
    const session = this.getSession();
    if (!session.toke) throw new Error('El Token es requerido');

    const params = new URLSearchParams();
    params.append('token', session.toke);

    const url = this.getFullApiUrl('/auth/checktoken');
    const response = await fetch(url, {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if(response.ok){
      const errorText = await response.text();
      throw new Error(`Error del servidor (estatus: ${response.status}, ${errorText})`);
    }

    return await response.json();
  }

  // Login de usuarios
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

  // Registro de usuarios
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

  // Obtener todos los usuarios
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

  // Obtener un usuario por ID
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

  // Crear un nuevo usuario
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

  // Actualizar un usuario con PUT
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

  // Actualizar un usuario con PATCH
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

  // Eliminar un usuario
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