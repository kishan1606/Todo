function Validation(values) {
  let error = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const password_pattern = /^.{9,}$/;

  if (values.name === "") {
    error.name = "Name should not be empty";
  } else {
    error.name = "";
  }

  if (values.username === "") {
    error.username = "Username should not be empty";
  } else {
    error.username = "";
  }

  if (values.email === "") {
    error.email = "Email should not be empty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email must be in format a-z@a-z.com";
  } else {
    error.email = "";
  }
  
  if (values.password === "") {
    error.password = "Password should not be empty";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Password should atleast 8 character";
  } else {
    error.password = "";
  }
  return error;
}
export default Validation;
