let makeRequest = async (method, url) => {
  return await fetch(`http://localhost:3003/api/${url}`, {
    method: method
  });
};
export default makeRequest;
