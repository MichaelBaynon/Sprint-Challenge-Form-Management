import React, { useState, useEffect } from "react";
import "./App.css";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";

const App = props => {
  console.log(props);

  const [users, setUsers] = useState([]);
  const { values, touched, errors, status } = props;
  useEffect(() => {
    if (status) {
      console.log('status', status)
      setUsers([...users, status])
    }
  }, [status])

  console.log('user', users)

  return (
    <div>
      <div className="instruction">
        <h1>Sign Up</h1>
      </div>

      {touched.username && errors.username && (
        <p className="error">{errors.username}</p>
      )}

      <Form className="form">
        <label>
          Username
          <Field
            className="field"
            type="text"
            name="username"
            placeholder="username"
          />
        </label>
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <label>
          Password
          <Field
            className="field"
            type="password"
            name="password"
            placeholder="password"
          />
        </label>
        <button type="submit">Submit</button>
        {users.length > 0 && users.map(user =>
          <div key={user.id}>{JSON.stringify(user)}</div>
        )}
      </Form>
    </div>
  );
};

const FormikForm = withFormik({
  mapPropsToValues: ({ username, password }) => {
    return {
      username: username || "",
      password: password || ""
    };
  },
  validationSchema: yup.object().shape({
    username: yup.string().required("username is required"),
    password: yup
      .string()
      .min(7, "Password must be at least 7 characters long")
      .required("password is required")
  }),
  handleSubmit: (values, { resetForm, setStatus }) => {
    console.log("Request");
    axios
      .post("http://localhost:5000/api/register", values)
      .then(res => {
        console.log(res);
        setStatus(res);
        resetForm();
      })
      .catch(error => {
        console.log(error);
      });
  }
})(App);

export default FormikForm;
