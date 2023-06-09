import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { loginUser } from "../user/userAction";

const initialState = {
  password: "Aa12345",
  confirmPassword: "Aa12345",
};

const Register = () => {
  const navigate = useNavigate();
  const [frmDt, setFrmDt] = useState(initialState);
  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      setError("");
      value.length < 6 && setError("Password is too short");

      !/[0-9]/.test(value) && setError("Must include number");
      !/[A-Z]/.test(value) && setError("Must include uppercase");
      !/[a-z]/.test(value) && setError("Must include lowercase");
    }

    setFrmDt({
      ...frmDt,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      loginUser(frmDt);

      const { confirmPassword, password, email } = frmDt;

      if (confirmPassword !== password) {
        return toast.error("Password do not match!");
      }
      console.log(frmDt);
      // use firebase auth service to auth or create user auth account
      const pendingState = createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.promise(pendingState, {
        pending: "Please wait...",
      });

      const { user } = await pendingState;
      console.log(user);
      if (user?.uid) {
        toast.success("user has been registered, you can login now");

        // user is registered=> add them to database

        const userObj = {
          fName: frmDt.fName,
          lName: frmDt.lName,
          email: frmDt.email,
          uid: user.uid,
        };
        await setDoc(doc(db, "users", user.uid), userObj);

        // redirect user to dashboard
        // navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const inputFields = [
    { label: "First Name", name: "fName", placeholder: "Sam", required: true },

    { label: "Last Name", name: "lName", placeholder: "Smith", required: true },
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Smith@emial.com",
      required: true,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "*****",
      required: true,
      value: frmDt.password,
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      placeholder: "*****",
      required: true,
      value: frmDt.confirmPassword,
    },
  ];

  return (
    <div className="form-container">
      <Form onSubmit={handleOnSubmit} className="border p-5 rounded shadow-lg">
        <h3>Join Our System</h3>
        <hr />

        {inputFields.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}
        <div className="p3">
          <Form.Text>
            Password should be longer than 6 charcters contain at least one
            number, one uppercase and one lowercase.
            {error && (
              <ul>
                <li className="text-danger fw-bolder">{error}</li>
              </ul>
            )}
          </Form.Text>
        </div>
        <Button variant="primary" type="submit" disabled={error}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
