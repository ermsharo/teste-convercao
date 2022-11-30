export const getIsLogged = () => {
  return localStorage.getItem("logged");
};

export const setIsLogged = () => {
  localStorage.setItem("logged", true);
};

export const getUserInfo = () => {
  return {
    id: localStorage.getItem("id"),
    user: localStorage.getItem("user_name"),
  };
};

export const setUserInfo = (id, user, token) => {
  localStorage.setItem("user_id", id);
  localStorage.setItem("user_name", user);
  localStorage.setItem("user_session_token", token);
  localStorage.setItem("is_logged", true);
};

export const getToken = () => {
  return localStorage.getItem("user_session_token");
};

export const getAplicationId = () => {
  return "48699c22-26a2-4126-9a63-f5d0dfd2768b";
};

export const logout = () => {
  localStorage.clear();
};
