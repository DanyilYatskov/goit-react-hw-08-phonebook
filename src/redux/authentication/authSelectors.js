const getIsAuthenticated = state => state.authentication.isAuthenticated;

const getUserName = state => state.authentication.user.name;

const authSelectors = {
  getIsAuthenticated,
  getUserName,
};

export default authSelectors;
