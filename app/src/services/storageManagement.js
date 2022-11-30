export const getIsLogged = () => {
  return localStorage.getItem("logged");
};

export const setIsLogged = () => {
  localStorage.setItem("logged", true);
};

export const getUserInfo = () => {
  return {
    id: localStorage.getItem("id"),
    user: localStorage.getItem("user"),
  };
};

export const setUserInfo = (id, user, token) => {
  localStorage.setItem("user_id", id);
  localStorage.setItem("user_name", user);
  localStorage.setItem("user_session_token", token);
  localStorage.setItem("is_logged", true);
};

export const setToken = () => {
  return localStorage.getItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.clear();
};
