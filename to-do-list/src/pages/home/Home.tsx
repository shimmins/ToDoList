import { Button, Calendar, theme, Tooltip } from "antd";
import React, { useState } from "react";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Dayjs } from "dayjs";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface todo {
  number: number;
  content: String;
  check: boolean;
}
export function Home() {
  const [num, setNum] = useState(0); //localStrorage에서 번호 불러오기
  const [content, setContent] = useState("");
  const [list, setList] = useState<todo[]>([]);
  const onContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };
  const onAdd = () => {
    //할일 추가하기
    const todo = {
      number: num,
      content: content,
      check: false,
    };
    setList([...list, todo]);
    setContent("");
    setNum(num + 1);
    //localStorage.setItem("todo", todo)
  };
  const onRemove = (number: number) => {
    console.log("삭제되었습니다", number);
    setList(
      list.filter((todo) => {
        if (todo.number === number) return false;
        else return true;
      })
    );
    setNum(num - 1);
  };
  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  const { token } = theme.useToken();
  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#E6E6FA",
        height: "100vh",
        width: "100%",
      }}
    >
      <div style={{ marginTop: "35px", marginLeft: "35px" }}>
        <div
          style={{
            marginLeft: "50px",
            backgroundColor: "#8A2BE2",
            height: "30px",
            width: "70%",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >
          <Link
            to={"/mypage"}
            style={{
              display: "flex",
              justifyContent: "center",
              color: "white",
              textDecorationLine: "none",
            }}
          >
            My Page
          </Link>
        </div>
        <div style={wrapperStyle}>
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        </div>
      </div>
      <div
        style={{
          borderRadius: "20px",
          backgroundColor: "white",
          margin: "30px",
          width: "70%",
          height: "80%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontFamily: "inherit",
            color: "#8A2BE2",
          }}
        >
          <h1>To-Do List</h1>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            margin: "10px",
          }}
        >
          <input
            style={{
              height: "50px",
              width: "60%",
              border: "solid 2px #8A2BE2",
              margin: "5px",
            }}
            placeholder="할 일 등록하기"
            value={content}
            onChange={onContent}
            type="text"
          />
          <Tooltip title="Add">
            <Button
              style={{ backgroundColor: "#8A2BE2", marginTop: "10px" }}
              onClick={onAdd}
              type="primary"
              icon={<PlusOutlined />}
              size={"large"}
            />
          </Tooltip>
        </div>
        <div>
          <div>
            {list.map((todo) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  margin: "20px",
                }}
              >
                <input
                  style={{
                    display: "inline-block",
                    width: "30px",
                    height: "30px",
                    marginRight: "10px",
                    border: "3px solid gray",
                    position: "relative",
                  }}
                  onClick={() => {
                    const newList = list.map((item) => {
                      if (todo.number === item.number) {
                        const newItem = {
                          number: item.number,
                          content: item.content,
                          check: !item.check,
                        };
                        return newItem;
                      } else {
                        return item;
                      }
                    });

                    setList(newList);
                  }}
                  type="checkbox"
                />
                <div
                  style={{
                    width: "60%",
                    borderBottom: "solid 2px gray",
                    textDecoration: todo.check ? "line-through" : "none",
                  }}
                >
                  {todo.content}
                </div>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    onRemove(todo.number);
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
