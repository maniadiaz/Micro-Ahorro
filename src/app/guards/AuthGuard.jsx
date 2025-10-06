import { ApiServices } from '../services/ApiServices';

class AuthService extends ApiServices {
  constructor() {
    super();
    this._authData = null;
  }

  // Login usando el servicio de API heredado
  async loginUser(identifier, password) {
    try {
      const response = await this.login(identifier, password);
      
      // Si la respuesta es un string, es un error
      if (typeof response === 'string') {
        return { 
          success: false, 
          error: response 
        };
      }

      // Si el login es exitoso, guardar datos en memoria
      if (response.user && response.token) {
        this.setAuthData({
          user: response.user,
          token: response.token,
          loggedInAt: response.loggedInAt,
          isLoggedIn: true
        });

        return {
          success: true,
          user: response.user,
          token: response.token,
          loggedInAt: response.loggedInAt
        };
      }

      return { 
        success: false, 
        error: 'Respuesta inválida del servidor' 
      };
    } catch (error) {
      console.error('Error en loginUser:', error);
      return { 
        success: false, 
        error: error.message || 'Error al iniciar sesión' 
      };
    }
  }

  // Verificar si el token es válido
  async isAuthenticated() {
    try {
      const authData = this.getAuthData();
      
      if (!authData || !authData.token) {
        return false;
      }

      // Verificar con el servidor usando checkToken heredado
      const response = await this.checkToken();
      
      // Si la respuesta es exitosa, el token es válido
      return response && response.status !== false;
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      // Si hay error, considerar no autenticado
      this.clearAuthData();
      return false;
    }
  }

  // Verificar permisos/roles del usuario
  async hasPermission(requiredRoles = []) {
    const authData = this.getAuthData();
    
    if (!authData || !authData.user) {
      return false;
    }

    // Si no se requieren roles específicos, solo verificar que esté autenticado
    if (requiredRoles.length === 0) {
      return true;
    }

    // Verificar si el usuario tiene alguno de los roles requeridos
    const userRoles = authData.user.roles || [];
    return requiredRoles.some(role => userRoles.includes(role));
  }

  // Cerrar sesión
  logoutUser() {
    this.clearAuthData();
  }

  // Guardar datos de autenticación
  setAuthData(data) {
    this._authData = {
      ...data,
      isLoggedIn: true
    };
  }

  // Obtener datos de autenticación
  getAuthData() {
    return this._authData;
  }

  // Obtener solo el usuario
  getUser() {
    return this._authData?.user || null;
  }

  // Obtener solo el token
  getToken() {
    return this._authData?.token || null;
  }

  // Verificar si está logueado
  isLoggedIn() {
    return this._authData?.isLoggedIn === true;
  }

  // Limpiar datos de autenticación
  clearAuthData() {
    this._authData = null;
  }

  // Obtener headers para peticiones autenticadas
  getAuthHeaders() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  }

  // Actualizar datos del usuario sin hacer logout
  updateUserData(userData) {
    if (this._authData) {
      this._authData.user = {
        ...this._authData.user,
        ...userData
      };
    }
  }
}

// Exportar una instancia única (Singleton)
export const authService = new AuthService();