export function setSession(token, userData){
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
}

export function getToken(){
    return localStorage.getItem("token");
}

export function getUser(){
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}

export function removeSession(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export function isLoggedIn(){
    return !!getToken();
}