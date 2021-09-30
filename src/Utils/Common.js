

export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
}
export const getToken = () => {
    return sessionStorage.getItem('token') || null;
}
export const setUserSession = (access_token,username) => {
    sessionStorage.setItem("token", access_token );
    sessionStorage.setItem("user", JSON.stringify(username));
}


export const removeUserSession = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

}