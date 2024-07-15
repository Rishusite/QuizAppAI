function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const time=today.getHours() 
  + ':' + today.getMinutes() 
  + ":" + today.getSeconds();
  //${month}/${date}/${year}:
  return `${month}/${date}/${year} ${time}`;
};

export {getDate};