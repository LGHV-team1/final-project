import { Link } from "react-router-dom";
import Button from "./button";
import Input from "./input";
function Register() {
  return (
    <form
      className="max-w-[400px] w-[400px] mx-auto bg-white p-4 border border-black mt-4 rounded"
      
    >
      <h2 className="text-5xl font-bold text-center py-5 font-face">
        ~오볼추~
      </h2>
      <div className="flex flex-col py-2">
        <label>Email</label>
        <Input 
          type="text"
          placeholder="example@xxx.com"
        />
      </div>
      <div className="flex flex-col py-2">
        <label>Password</label>
        <Input type="password" />
      </div>
      <div className="flex flex-col py-2">
        <label>Password 확인</label>
        <Input type="password" />
      </div>
      <div className="flex flex-col py-2">
        <label>Username</label>
        <Input type="password" />
      </div>
      <div className="flex justify-between ">
        <Link to="/login">
          <Button label={"아이디가 있음"} />
        </Link>
        <Button label={"회원가입"} />
      </div>
    </form>
  );
}

export default Register;
