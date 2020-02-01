let makeRequest = async (method, url) => {
  console.log(process.env.API_RECOMENDATIONS_PORT);
  return await fetch(`http://localhost:${process.env.API_RECOMENDATIONS_PORT}/api/${url}`, {
    method: method
  });
};
export default makeRequest;
