import React, { useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

interface User {
  USER_NAME: String;
  USER_ID: String;
  USER_PASSWORD: String;
}
export function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  const onPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const onLogin = () => {
    Axios.post<User[]>("/login", { id: id })
      .then((res) => {
        const userData = res.data[0];
        const userPassword = userData.USER_PASSWORD;

        if (password === userPassword) {
          navigate("/home");
        } else alert("비밀번호가 틀렸습니다.");
      })
      .catch((e: Error) => {
        //아이디가 없는 경우
        console.error(e);
        alert("존재하지 않는 회원입니다.");
      });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "	#E6E6FA",
        height: "100vh",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          alt="DOIT_LOGO.png"
          src="./DOIT_LOGO.png"
          style={{ width: "250px", height: "400px" }}
        ></img>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "60%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "80%",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#8A2BE2",
              marginTop: "10px",
            }}
          >
            <h1 style={{ fontSize: "40px" }}>Login</h1>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "20px 0 30px 0",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "55%",
                color: "gray",
              }}
            >
              UserID
            </div>
            <input
              style={{
                backgroundColor: "#E6E6FA",
                height: "30px",
                width: "59%",
                border: "none",
                borderRadius: "10px",
                margin: "5px",
                paddingLeft: "15px",
              }}
              value={id}
              onChange={onId}
              type="text"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "55%",
                color: "gray",
              }}
            >
              UserPassword
            </div>
            <input
              style={{
                backgroundColor: "#E6E6FA",
                height: "30px",
                width: "59%",
                border: "none",
                borderRadius: "10px",
                margin: "5px",
                paddingLeft: "15px",
              }}
              value={password}
              onChange={onPassword}
              type="text"
            />
            <Button
              style={{
                marginTop: "30PX",
                backgroundColor: "#8A2BE2",
                width: "60%",
              }}
              size={"large"}
              onClick={onLogin}
              type="primary"
            >
              Login
            </Button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "15px",
            width: "80%",
            height: "80px",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "45%",
              color: "gray",
            }}
          >
            계정이 없으신가요?
            <div
              style={{
                marginRight: "20px",
                color: "#8A2BE2",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              가입하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
