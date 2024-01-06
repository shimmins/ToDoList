export function Test() {
  //명함 만들기 테스트
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "black",
          margin: "20px",
          width: "60%",
          height: "35%",
        }}
      >
        <div>IMAGE</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "black",
          margin: "20px",
          width: "60%",
          height: "35%",
        }}
      >
        <div style={{ color: "white" }}>
          <ul>
            <li>김유진</li>
            <li>행동으로 보여주는 개발자</li>
            <li>서경대학교 멋쟁이사자처럼 운영진</li>
            <li>010 - 3454 - 9050</li>
            <li>uj0791navercom@skuniv.ac.kr</li>
          </ul>
        </div>
        <div>IMAGE</div>
      </div>
    </div>
  );
}
