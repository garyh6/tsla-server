import { Button, Col, Form, Icon, Input, Row } from "antd";
import axios from "axios";
import React, { createRef, useRef, useState } from "react";
import { emitPatchProperty } from "../../sockets/sockets";

const Properties = ({ vehicleConfig }) => {
  if (!vehicleConfig.properties) vehicleConfig.properties = {};
  const fixedProps = Object.keys(vehicleConfig);
  fixedProps.splice(fixedProps.indexOf("properties"), 1);

  // maybe rename (component state used for pending props)
  const [config, setConfig] = useState(vehicleConfig);
  // if prop in pending then use pending prop else use mobx
  const [pendingUpdate, setPendingUpdate] = useState([]);

  const updateProperty = (key, value) => {
    setConfig({ ...config, [key]: value });
  };

  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState();
  const addProperty = async e => {
    e.preventDefault();

    // if keys exist don't overwrite
    if (!newKey || !newValue) return;
    if (Object.keys(config.properties).includes(newKey)) return;
    if (Object.keys(config).includes(newKey)) return;

    setPendingUpdate([...pendingUpdate, newKey]);

    emitPatchProperty(
      { newKey, newValue, id: vehicleConfig._id },
      (err, res) => {
        if (err) {
          console.log("************ emit patch err");
          // remove key from pendingUpdate
          // change to flash error
          // dont setConfig
        } else {
          console.log("************ should say success", res);
          // remove from pending
          // add to pending config as delivered
          // set to delivered
          let newConfig = { ...config };
          newConfig.properties[newKey] = newValue;

          setConfig(newConfig);
          console.log("************ delivered res", res);
        }
      }
    );

    setNewKey("");
    setNewValue();
  };

  const deleteProperty = async key => {
    let newProps = { ...config };
    delete newProps.properties[key];
    setConfig(newProps);

    // delete from sever
    axios({
      method: "delete",
      url: `/vehicles/${config._id}`,
      data: {
        key
      }
    })
      .then(res => console.log("************ deleteProperty res", res))
      .catch(err => console.log("************ deleteProperty err", err));
  };
  // todo revisit useRef list with calculated length
  const len =
    Object.keys(config).length - 1 + Object.keys(config.properties).length;
  const elRef = useRef([...Array(len)].map(() => createRef()));
  const [enabledInput, setEnabledInput] = useState([]);
  const toggleEnableInput = async (key, refIdx) => {
    let newList = [...enabledInput];
    const idx = newList.indexOf(key);
    if (idx >= 0) {
      newList.splice(idx, 1);
    } else {
      newList.push(key);
    }
    setEnabledInput(newList);

    if (idx >= 0) {
      // send patch to server
      // revert to previous config (might need to have pendingConfig)
      axios({
        method: "patch",
        url: `/vehicles/${config._id}`,
        data: {
          key,
          value: elRef.current[refIdx].current.state.value
        }
      })
        .then(res => console.log("************toggleEnableInput res", res))
        .catch(err => console.log("************toggleEnableInput err", err));
    }
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 8 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 14 },
      sm: { span: 14 }
    }
  };
  // todo allow copy paste of disabled
  return (
    <Row span={24} className="wrapper-form">
      <Form {...formItemLayout}>
        {fixedProps.map(key => (
          <Form.Item key={key} label={key} className="form-item-group">
            <Input disabled defaultValue={config[key]}></Input>
          </Form.Item>
        ))}

        {Object.keys(config.properties)
          .sort()
          .map((key, idx) => {
            const refIdx = idx + fixedProps.length;
            return (
              <Form.Item label={key} key={key} className="form-item-group">
                <Input
                  disabled={!!!enabledInput.includes(key)}
                  defaultValue={config.properties[key]}
                  onChange={e => updateProperty(key, e.target.value)}
                  ref={elRef.current[refIdx]}
                  addonAfter={
                    <Icon
                      className="icon icon-edit"
                      type="edit"
                      theme="twoTone"
                      onClick={() => toggleEnableInput(key, refIdx)}
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
      <Col span={24} className="group-add-property">
        <Row gutter={[0, 0]}>
          <Col span={8}>
            <Input
              type="text"
              placeholder="key"
              value={newKey || ""}
              onChange={e => setNewKey(e.target.value)}
            />
          </Col>
          <Col span={8}>
            <Input
              type="text"
              placeholder="value"
              value={newValue || ""}
              onChange={e => setNewValue(e.target.value)}
            />
          </Col>
          <Col span={3}>
            <Button onClick={addProperty}>Add Property</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Properties;