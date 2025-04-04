import React, { useState } from "react";
import { Link } from "react-router-dom";
const CaptainSignUp = () => {
  const [captainData, setCaptainData] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      vehcile: {
        color: color,
        capacity: capacity,
        plate: plate,
        type: type,
      },
    });

    setFirstName("");
    setLastName("");
    setPassword("");
    setEmail("");
    setColor("");
    setCapacity("");
    setPlate("");
    setType("");
  };
  return (
    <div className="h-screen p-7 flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-lg font-medium mb-2">
            What's your Captain name?
          </h3>
          <div className="flex gap-4 mb-5">
            <input
              className="bg-[#eeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base"
              required
              type="text"
              placeholder="Firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="bg-[#eeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base"
              type="text"
              placeholder="Lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <h3 className="text-lg font-medium mb-2">Captain Email</h3>
          <input
            className="bg-[#eeee] mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            required
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            className="bg-[#eeee] mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            required
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-[#111] text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Sign up
          </button>
        </form>
        <p className="text-center">
          Already have a Captain account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>{" "}
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          By proceeding, you consent to get promotional emails, including by
          automated means, from Uber and its affiliates to the email address
          provided
        </p>
      </div>
    </div>
  );
};

export default CaptainSignUp;
