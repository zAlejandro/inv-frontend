export function setSession(token, userData, refreshToken, stayLoggedIn){
    if(stayLoggedIn){
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
    }else{
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("refreshToken", refreshToken);
    }
    localStorage.setItem("user", JSON.stringify(userData));
}

export function getRefreshToken(){
    return(
        localStorage.getItem("refreshToken") ||
        sessionStorage.getItem("refreshToken")
    );
}

export function getToken(){
    return (localStorage.getItem("token") ||
        sessionStorage.getItem("refreshToken")
    );
}

export function getUser(){
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}

export function removeSession(){
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
}

export function isLoggedIn(){
    return !!getToken();
}