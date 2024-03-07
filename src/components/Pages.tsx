import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import "./pages.css";
import { Button, Table } from "antd";
import UserModal from "./Modal";
import { useGetUserQuery } from "../Redux/Service/userAPISlice";
import { EditOutlined } from "@ant-design/icons";

const Pages = () => {
  const [dividerPositionX, setDividerPositionX] = useState(
    window.innerWidth / 2
  );
  const [dividerPositionY, setDividerPositionY] = useState(
    window.innerHeight / 2
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { data, isSuccess, isError, refetch } = useGetUserQuery({});
  const [userData, setUserData] = useState([]);
  const [selectUserData, setSelectedUserData] = useState();
  const [apiCallCount, setApiCallCount] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDragX = (e: any, ui: any) => {
    const newPosition = dividerPositionX + ui.deltaX;
    setDividerPositionX(newPosition);
  };
  const handleDragY = (e: any, ui: any) => {
    const newPosition = dividerPositionY + ui.deltaY;
    setDividerPositionY(newPosition);
  };

  const columns: any = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      align: "left" as const,
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      align: "left" as const,
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "left" as const,
    },
    {
      title: "Date of birth",
      dataIndex: "dob",
      align: "left" as const,
    },
    {
      title: "Edit",
      key: "Actions",
      align: "left",
      render: (record: any) => {
        return (
          <EditOutlined
            onClick={() => {
              setSelectedUserData(record);
              setIsEdit(true);
            }}
          />
        );
      },
    },
  ];
  useEffect(() => {
    if (data) {
      setUserData(data?.result);
    }
  }, [data?.result]);
  useEffect(() => {
    if (data) {
      setApiCallCount((prevCount) => prevCount + 1);
    }
  }, [data?.result]);

  return (
    <div className="grid-container">
      <div className="container">
        <Draggable
          axis="x"
          bounds="parent"
          position={{ x: 0, y: 0 }}
          onDrag={handleDragX}
        >
          <div className="divider-x" />
        </Draggable>
        <div
          className="left"
          style={{ width: dividerPositionX, height: dividerPositionY }}
        >
          <Button
            style={{ width: "100px" }}
            type="primary"
            onClick={() => setModal(true)}
          >
            Add User
          </Button>{" "}
          <span>API Calls: {apiCallCount}</span>
          <hr></hr>
          <Table
            columns={columns}
            dataSource={userData}
            scroll={{ x: window.innerWidth - dividerPositionX, y: "auto" }}
          />
        </div>
        <Draggable
          axis="x"
          bounds="parent"
          position={{ x: dividerPositionX, y: 0 }}
          onDrag={handleDragX}
        >
          <div className="divider-x" />
        </Draggable>
        <div
          className="right"
          style={{
            width: window.innerWidth - dividerPositionX,
            height: dividerPositionY,
            paddingTop:"19px",
            overflow: "auto",
          }}
        >
          <br></br>
          <hr></hr>
          <Table
            columns={columns}
            dataSource={userData}
            scroll={{ x: window.innerWidth - dividerPositionX, y: "auto" }}
          />
        </div>
      </div>
      <Draggable
        axis="y"
        bounds="parent"
        position={{ x: 0, y: dividerPositionY }}
        onDrag={handleDragY}
      >
        <div className="divider-y" />
      </Draggable>
      <div
        className="bottom"
        style={{
          height: window.innerHeight - dividerPositionY,
          overflowY: "auto",
        }}
      >
        <hr></hr>
        <Table
          columns={columns}
          dataSource={userData}
          scroll={{ x: window.innerWidth - dividerPositionX, y: "auto" }}
        />
      </div>
      {modal && (
        <UserModal
          open={modal}
          setModal={setModal}
          isEdit={false}
          refetch={refetch}
          apiCount={apiCallCount}
        />
      )}
      {isEdit && (
        <UserModal
          open={isEdit}
          setModal={setIsEdit}
          isEdit={isEdit}
          refetch={refetch}
          selectUserData={selectUserData}
          apiCount={apiCallCount}
        />
      )}
    </div>
  );
};

export default Pages;
