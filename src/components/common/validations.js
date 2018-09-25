const isEmpty = field => {
  if (field.trim() === "") {
    return true;
  }
  return false;
};

const checks = {
  isEmpty
};

export default checks;
