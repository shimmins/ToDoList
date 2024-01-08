import { useNavigate } from "react-router-dom";

export function Logout() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#151F42",
        height: "100vh",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          alt="DOIT.png"
          src="./DOIT.png"
          style={{ width: "1000px", height: "600px" }}
        ></img>
        <div
          style={{ marginRight: "20px", color: "#A36AB9", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          LOGIN
        </div>
      </div>
    </div>
  );
}
