import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import React, { useState } from "react";
import Modal from "./Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Image from "next/image";

const Register = () => {
  const loginModal = useLoginModal();
  const [loading, setLoading] = useState(false);
  const { isOpen, onClose } = useRegisterModal();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("/api/auth/signup", { ...formData })
      .then(() => {
        onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal isOpen={isOpen}>
      <div className={`w-full h-full sm:px-4 md:px-6 py-3`}>
        <h1 className="text-xl md:text-2xl font-bold leading-tight pt-4">Create an Account</h1>

        <form className="mt-6" onSubmit={handleSubmit}>
          <Input
            type={"text"}
            name="name"
            id="name"
            label="Name"
            value={formData.name}
            required={true}
            onChange={handleChange}
          />
          <Input
            type={"email"}
            name="email"
            id="loginEmail"
            label="Email"
            value={formData.email}
            required={true}
            onChange={handleChange}
          />
          <Input
            type={"password"}
            name="password"
            id="loginPass"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            required={true}
            minlength={6}
          />
          <Button disabled={loading} type="submit" text="Sign Up" onClick={() => {}} />
        </form>
        <hr className="my-6 w-full" />
        <button
          className="group px-6 py-3 w-full border-[1px] border-border rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
        >
          <div className="relative flex items-center space-x-4 justify-center">
            <Image
              width={50}
              height={45}
              src="/github-amber.svg"
              className="absolute left-0 w-5"
              alt="google logo"
            />
            <span
              className={`block w-max font-semibold tracking-wide text-sm 
              transition duration-300 group-hover:text-blue-600 sm:text-base`}
            >
              Sign Up with Github
            </span>
          </div>
        </button>
        <p className="mt-8 text-center">
          Already have an account?&nbsp;
          <span
            onClick={() => {
              loginModal.onOpen();
              onClose();
            }}
            className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
          >
            Log In
          </span>
        </p>
      </div>
    </Modal>
  );
};

export default Register;
