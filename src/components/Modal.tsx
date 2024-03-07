import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  message,
} from "antd";

import React, { useEffect, useState } from "react";
import {
  useAddUserMutation,
  useUpdateUserMutation,
} from "../Redux/Service/userAPISlice";

import dayjs from "dayjs";
function UserModal(props: any) {
  const { open, setModal, isEdit, selectUserData, refetch, setIsEdit } = props;
  const [form] = Form.useForm();
  const [addUser, addUserInfo] = useAddUserMutation({});
  const [updateUsers, updateUserInfo] = useUpdateUserMutation({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (data: any) => {
    setIsSubmitting(true);
    let body = {};
    if (isEdit == true) {
      body = {
        fullName:
          data?.fullName == undefined
            ? data?.fullName
            : selectUserData?.fullName,
        email: data?.email,
        mobileNumber: data?.mobileNumber,
        dob: data?.dob,
        _id: selectUserData?._id,
      };
      updateUsers(body);
    } else {
      body = {
        fullName: data?.fullName,
        email: data?.email,
        mobileNumber: data?.mobileNumber,
        dob: data?.dob,
      };
      addUser(body);
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (addUserInfo.isSuccess) {
      message.success(addUserInfo?.data?.message);
      setModal(false);
      refetch();
    }
  }, [addUserInfo]);

  useEffect(() => {
    if (addUserInfo.isError) {
      message.success(addUserInfo?.data?.error);
    }
  }, [addUserInfo]);

  useEffect(() => {
    if (updateUserInfo.isSuccess) {
      message.success(updateUserInfo?.data?.message);
      setModal(false);
      refetch();
    }
  }, [updateUserInfo]);

  useEffect(() => {
    if (updateUserInfo.isError) {
      message.success(updateUserInfo?.data?.error);
    }
  }, [updateUserInfo]);
  useEffect(() => {
    if (isEdit) {
      // Set form fields if in edit mode and data is available
      form.setFieldsValue({
        fullName: selectUserData?.fullName,
        email: selectUserData?.email,
        mobileNumber: selectUserData?.mobileNumber,
        dob: dayjs(selectUserData?.dob), // Assuming dob is in date format
      });
    }
  }, [isEdit]);

  return (
    <Modal
      title={isEdit ? "Update User" : "Add User"}
      open={open}
      onCancel={() => setModal(false)}
      okButtonProps={{ disabled: true }}
      cancelButtonProps={{ disabled: true }}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
        // initialValues={isEdit ? selectUserData : ""}
      >
        <Row gutter={24}>
          <Col xs={24} sm={12} md={12} xl={12} xxl={12}>
            <Form.Item
              label="FullName"
              rules={[
                {
                  required: true,
                  message: "Full Name is required.",
                },
              ]}
              name="fullName"
            >
              <Input name="fullName" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} xl={12} xxl={12}>
            <Form.Item
              label="Email"
              rules={[
                {
                  required: true,
                  message: "E-mail is required.",
                },
              ]}
              name="email"
            >
              <Input name="email" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} xl={12} xxl={12}>
            <Form.Item
              label="Mobile Number"
              rules={[
                {
                  required: true,
                  message: "Mobile Number is required.",
                },
              ]}
              name="mobileNumber"
            >
              <Input name="mobileNumber" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} xl={12} xxl={12}>
            <Form.Item
              label="Date of Birth"
              rules={[
                {
                  required: true,
                  message: "Date of Birth is required.",
                },
              ]}
              name="dob"
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              marginTop: "20px",
            }}
          >
            <Form.Item name={"submit"}>
              <Button
                type={"primary"}
                htmlType={"submit"}
                loading={isSubmitting}
              >
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default UserModal;
