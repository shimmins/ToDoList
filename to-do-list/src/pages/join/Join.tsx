import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

export function Join() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  const onPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate();

  const onSubmit = () => {
    localStorage.setItem(id, password);
    navigate("../login");
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
          margin: "90px",
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
          <h1>Welcome!</h1>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "20px",
            width: "100%",
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
              onClick={onSubmit}
              type="primary"
              block
            >
              Join
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
