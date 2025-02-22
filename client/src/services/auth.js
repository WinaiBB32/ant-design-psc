export function login(token, role, userId) {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
}

export function getRole() {
    return localStorage.getItem("role");
}

export function isAuthenticated() {
    return localStorage.getItem("token") !== null;
}
