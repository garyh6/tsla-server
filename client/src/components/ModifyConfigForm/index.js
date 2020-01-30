import { Button, Form, Icon, Input } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import "./form.scss";
const ModifyConfigForm = () => {
  const [properties, setProperties] = useState({
    id: 1,
    title: 2,
    something: 3
  });

  useEffect(() => {
    fetch("/vehicles", {
      method: "GET"
    })
      .then(res => {
        console.log("************ res", res);
      })
      .catch(err => {
        console.log("************ err", err);
      });
  }, []);

  const updateProperty = (key, value) => {
    setProperties({ ...properties, [key]: value });
  };

  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState();

  const addProperty = e => {
    e.preventDefault();
    if (!newKey || !newValue) return;

    setProperties({ [newKey]: newValue, ...properties });
    setNewKey("");
    setNewValue();
  };

  const deleteProperty = key => {
    let newProps = { ...properties };
    delete newProps[key];
    setProperties(newProps);
  };

  const [enabledInput, setEnabledInput] = useState([]);
  const toggleEnableInput = key => {
    let newList = [...enabledInput];
    const idx = newList.indexOf(key);
    if (idx >= 0) {
      newList.splice(idx, 1);
    } else {
      newList.push(key);
    }
    setEnabledInput(newList);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 3 },
      sm: { span: 3 }
    },
    wrapperCol: {
      xs: { span: 8 },
      sm: { span: 8 }
    }
  };

  return (
    <div className="wrapper-form">
      <h1>Vehicle Properties</h1>
      <Form {...formItemLayout}>
        <Form.Item label="ID" className="form-item-group">
          <Input
            disabled={!enabledInput.includes("id")}
            defaultValue={properties.id}
            onChange={e => updateProperty("id", e.target.value)}
            addonAfter={
              <Icon
                className="icon icon-edit"
                type="edit"
                theme="twoTone"
                onClick={() => toggleEnableInput("id")}
              />
            }
          ></Input>
        </Form.Item>
        <Form.Item label="Title" className="form-item-group">
          <Input
            disabled={!enabledInput.includes("title")}
            defaultValue={properties.title}
            onChange={e => updateProperty("title", e.target.value)}
            addonAfter={
              <Icon
                className="icon icon-edit"
                type="edit"
                theme="twoTone"
                onClick={() => toggleEnableInput("title")}
              />
            }
          ></Input>
        </Form.Item>

        {Object.keys(properties)
          .filter(k => k !== "id" && k !== "title")
          .sort()
          .map(key => {
            return (
              <Form.Item label={key} key={key} className="form-item-group">
                <Input
                  disabled={!!!enabledInput.includes(key)}
                  defaultValue={properties[key]}
                  onChange={e => updateProperty(key, e.target.value)}
                  addonAfter={
                    <Icon
                      className="icon icon-edit"
                      type="edit"
                      theme="twoTone"
                      onClick={() => toggleEnableInput(key)}
                    />
                  }
                ></Input>
                <Icon
                  className="icon icon-delete"
                  type="delete"
                  theme="twoTone"
                  twoToneColor="#eb2f96"
                  onClick={() => deleteProperty(key)}
                />
              </Form.Item>
            );
          })}
      </Form>
      <div className="group-add-property">
        <input
          type="text"
          placeholder="key"
          value={newKey || ""}
          onChange={e => setNewKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="value"
          value={newValue || ""}
          onChange={e => setNewValue(e.target.value)}
        />
      </div>
      <Button onClick={addProperty}>Add Property</Button>
    </div>
  );
};

export default ModifyConfigForm;
