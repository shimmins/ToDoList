import { Button, Calendar, theme, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Dayjs } from "dayjs";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import Axios from "axios";

interface Todo {
  TODO_ID: number;
  TODO_CONTENT: String;
  TODO_CHECK: boolean;
}

export function Home() {
  const [num, setNum] = useState(0);
  const [content, setContent] = useState("");
  const [list, setList] = useState<Todo[]>([]);
  const onContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  useEffect(() => {
    Axios.get<Todo[]>("/home")
      .then((res) => {
        const { data } = res;
        //console.log("Data received:", data);

        const formattedData = data.map((todo) => ({
          TODO_ID: todo.TODO_ID,
          TODO_CONTENT: todo.TODO_CONTENT,
          TODO_CHECK: todo.TODO_CHECK,
        }));

        setList(formattedData);
        setContent("");
      })
      .catch((e: Error) => {
        console.error(e);
      });
  }, []);

  const onAdd = () => {
    const todo = {
      TODO_ID: num,
      TODO_CONTENT: content,
      TODO_CHECK: false,
    };

    console.log(todo.TODO_CONTENT);
    Axios.post("/home", { todo: todo.TODO_CONTENT })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e: Error) => {
        console.error(e);
      });

    setList([...list, todo]);
    setContent("");
    setNum(num + 1);
  };

  const onRemove = (id: number) => {
    Axios.delete("/delete", { data: { id: id } })
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });

    setList(
      list.filter((todo) => {
        if (todo.TODO_ID === id) return false;
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
        justifyContent: "center",
        backgroundColor: "#E6E6FA",
        height: "100vh",
        width: "100%",
      }}
    >
      <div style={{ margin: "50px 35px 0 0" }}>
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
          height: "90%",
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
              outline: "none",
              paddingLeft: "10px",
            }}
            placeholder="할 일 등록하기"
            value={content}
            onChange={onContent}
            type="text"
          />
          <Tooltip title="Add">
            <Button
              style={{ backgroundColor: "#8A2BE2", margin: "10px 0 10px 10px" }}
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
                  key={todo.TODO_ID}
                  onClick={() => {
                    const newList = list.map((item) => {
                      if (todo.TODO_ID === item.TODO_ID) {
                        const newItem = {
                          TODO_ID: item.TODO_ID,
                          TODO_CONTENT: item.TODO_CONTENT,
                          TODO_CHECK: !item.TODO_CHECK,
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
                    textDecoration: todo.TODO_CHECK ? "line-through" : "none",
                  }}
                >
                  {todo.TODO_CONTENT}
                </div>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    onRemove(todo.TODO_ID);
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
