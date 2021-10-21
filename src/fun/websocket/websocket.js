// Check server message
const serverMessageTry = (data) => {
  try {
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    return false;
  }
  return false;
};
// Check json
const jsonTry = (data) => {
  try {
    if (data) {
      return data;
    }
  } catch (error) {
    return '';
  }
  return '';
};

export {
  jsonTry,
  serverMessageTry,
};
