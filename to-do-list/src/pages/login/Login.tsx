import React, { useState } from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

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
    const check = localStorage.getItem(id);
    if (check === password) {
      navigate("/mypage", { state: { id: password } });
    } else alert("입력한 정보를 다시 확인해주세요.");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "	#E6E6FA",
        height: "100vh",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "40%",
          marginTop: "90px",
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            color: "#8A2BE2",
          }}
        >
          <h1>Login</h1>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "20px",
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
              width: "60%",
              border: "none",
              borderRadius: "10px",
              margin: "5px",
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
              width: "60%",
              border: "none",
              borderRadius: "10px",
              margin: "5px",
            }}
            value={password}
            onChange={onPassword}
            type="text"
          />
          <div style={{ width: "100px" }}>
            <br></br>
            <Button
              style={{ backgroundColor: "#8A2BE2" }}
              size={"large"}
              onClick={onLogin}
              type="primary"
              block
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15px",
          width: "40%",
          height: "12%",
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            width: "55%",
            color: "gray",
          }}
        >
          계정이 없으신가요?
          <Link
            style={{
              color: "#8A2BE2",
            }}
            to={"/join"}
          >
            가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}
