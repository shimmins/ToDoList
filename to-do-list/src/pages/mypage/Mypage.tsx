import { Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

export function Mypage() {
  const location = useLocation();
  const id = location.state.value;

  const navigate = useNavigate();
  const onLink = () => {
    navigate("/home");
  };
  const onExit = () => {
    localStorage.removeItem(id);
    navigate("/login");
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
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            color: "#8A2BE2",
          }}
        >
          환영합니다!!
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            style={{
              margin: "5px",
              width: "20%",
              backgroundColor: "#8A2BE2",
            }}
            type="primary"
            block
            onClick={onLink}
          >
            Home
          </Button>
          <Button
            style={{
              margin: "5px",
              width: "20%",
              backgroundColor: "#8A2BE2",
            }}
            type="primary"
            block
            onClick={onExit}
          >
            Exit
          </Button>
        </div>
      </div>
    </div>
  );
}
