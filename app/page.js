"use client";
import "./globals.css";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { openDB } from "idb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import LoginScreenNavbar from "@/components/LoginScreenNavbar";

const Page = () => {
  const [switchRegister, setswitchRegister] = useState(false);
  const router = useRouter();

  // Function to initialize IndexedDB
  const initDB = async () => {
    return openDB("UserDatabase", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("users")) {
          db.createObjectStore("users", { keyPath: "email" });
        }
      },
    });
  };

  // Function to check if user exists
  const checkUserExists = async (email) => {
    const db = await initDB();
    const tx = db.transaction("users", "readonly");
    const store = tx.objectStore("users");
    return store.get(email);
  };

  // Function to register a user
  const registerUser = async (user) => {
    const db = await initDB();
    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");
    await store.add(user);
    console.log(user);

    localStorage.setItem("email", user.email);
    toast.success("User registered successfully!");
    router.push("/HomeScreen");
  };

  // Function to handle login
  const handleLogin = async (email, password) => {
    const user = await checkUserExists(email);
    if (user) {
      if (user.Password === password) {
        localStorage.setItem("email", email);
        toast.success("Login successful!");
        router.push("/HomeScreen");
      } else {
        toast.error("Incorrect password!");
      }
    } else {
      toast.error("User not found! Please register.");
    }
  };

  const validationSchema = yup.object({
    Firstname: !switchRegister
      ? yup
          .string("Enter your first name")
          .min(2, "First name should be at least 2 characters long")
          .required("First name is required")
      : yup.string(),

    Lastname: !switchRegister
      ? yup
          .string("Enter your last name")
          .min(2, "Last name should be at least 2 characters long")
          .required("Last name is required")
      : yup.string(),

    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),

    Password: yup
      .string("Enter your password")
      .min(6, "Password should be at least 6 characters long")
      .required("Password is required"),

    cPassword: !switchRegister
      ? yup
          .string("Confirm your password")
          .oneOf([yup.ref("Password"), null], "Passwords must match")
          .required("Confirm password is required")
      : yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      Firstname: "",
      Lastname: "",
      email: "",
      Password: "",
      cPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!switchRegister) {
        // Register the user
        const userExists = await checkUserExists(values.email);
        if (userExists) {
          toast.error("User already exists. Please sign in.");
        } else {
          await registerUser(values);
        }
      } else {
        // Login the user
        await handleLogin(values.email, values.Password);
      }
    },
  });

  return (
    <>
      <LoginScreenNavbar />
      <div className=" flex justify-center items-center flex-col h-screen">
        <ToastContainer />
        <form className="form" onSubmit={formik.handleSubmit}>
          <p className="title">{!switchRegister ? "Register" : "Sign In"} </p>
          <p className="message">
            {!switchRegister
              ? "Signup now and get full access to our app."
              : "Sign in to continue."}
          </p>

          {!switchRegister && (
            <div className="flex">
              <label>
                <input
                  className="input"
                  type="text"
                  name="Firstname"
                  value={formik.values.Firstname}
                  onChange={formik.handleChange}
                />
                <span>Firstname</span>
              </label>
              {formik.touched.Firstname && formik.errors.Firstname && (
                <p className="error">{formik.errors.Firstname}</p>
              )}

              <label>
                <input
                  className="input"
                  type="text"
                  name="Lastname"
                  value={formik.values.Lastname}
                  onChange={formik.handleChange}
                />
                <span>Lastname</span>
              </label>
              {formik.touched.Lastname && formik.errors.Lastname && (
                <p className="error">{formik.errors.Lastname}</p>
              )}
            </div>
          )}

          <label>
            <input
              className="input"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <span>Email</span>
          </label>
          {formik.touched.email && formik.errors.email && (
            <p className="error">{formik.errors.email}</p>
          )}

          <label>
            <input
              className="input"
              type="password"
              name="Password"
              value={formik.values.Password}
              onChange={formik.handleChange}
            />
            <span>Password</span>
          </label>
          {formik.touched.Password && formik.errors.Password && (
            <p className="error">{formik.errors.Password}</p>
          )}

          {!switchRegister && (
            <>
              <label>
                <input
                  className="input"
                  type="password"
                  name="cPassword"
                  value={formik.values.cPassword}
                  onChange={formik.handleChange}
                />
                <span>Confirm password</span>
              </label>
              {formik.touched.cPassword && formik.errors.cPassword && (
                <p className="error">{formik.errors.cPassword}</p>
              )}
            </>
          )}

          <button className="submit" type="submit">
            Submit
          </button>

          {!switchRegister ? (
            <p className="signin">
              Already have an account?
              <a onClick={() => setswitchRegister(true)}>Sign In</a>
            </p>
          ) : (
            <p className="signin">
              Dont have an account?
              <a onClick={() => setswitchRegister(false)}>Sign Up</a>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default Page;
