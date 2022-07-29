import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { Button } from "antd";

import ModalForm from "./ModalForm";

import "antd/dist/antd.css";
import "./styles.css";

const App = () => {
  const [visible, setVisible] = useState(false);
  const [formRef, setFormRef] = useState(null);

  const handleCreate = () => {
    formRef.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log("Received values of form: ", values);
      formRef.resetFields();
      setVisible(false);
    });
  };

  const saveFormRef = useCallback(node => {
    if (node !== null) {
      setFormRef(node);
    }
  }, []);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Show Modal
      </Button>
      <ModalForm
        ref={saveFormRef}
        visible={visible}
        onCancel={() => setVisible(false)}
        onCreate={() => handleCreate()}
      />
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
