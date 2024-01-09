import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

import Axios from "axios";

interface User {
  USER_NAME: String;
  USER_ID: String;
  USER_PASSWORD: String;
}

export function Join() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const onId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  const onPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate();

  const onSubmit = () => {
    const user: User = {
      USER_NAME: name,
      USER_ID: id,
      USER_PASSWORD: password,
    };

    Axios.post("/", { user: user })
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((e: Error) => {
        console.error(e);
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
            <h1 style={{ fontSize: "40px" }}>Welcome!</h1>
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
              UserName
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
              value={name}
              onChange={onName}
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
              onClick={onSubmit}
              type="primary"
            >
              JOIN
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
            계정이 있으신가요?
            <div
              style={{
                marginRight: "20px",
                color: "#8A2BE2",
                cursor: "pointer",
              }}
              onClick={() => navigate("/login")}
            >
              로그인하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
