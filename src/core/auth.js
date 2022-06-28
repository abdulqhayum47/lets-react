class Auth {
    constructor() {
        this.authenicated = false;
    }
    
    isAuthenticated() {
        return localStorage.getItem('access_token');
    }
}

export default new Auth();