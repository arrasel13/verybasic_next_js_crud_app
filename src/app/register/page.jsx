"use client";

import RegisterUser from "../actions/auth/registeruser";

const RegisterPage = () => {
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;
    const payload = { username, password };
    const result = await RegisterUser(payload);
    console.log(result);
  };

  return (
    <>
      <form
        onSubmit={handleRegister}
        className="flex flex-col items-center justify-center pt-12"
      >
        <div>
          <label htmlFor="">Username: </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border"
          />
        </div>
        <br />
        <div>
          <label htmlFor="">Password: </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border"
          />
        </div>
        <br />
        <button type="submit" className="border py-2 px-3">
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterPage;
