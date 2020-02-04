// q: how can i modularize / extract out sockets

// in case data out of sync (resync button)
// if vehicle is offline - no indication
import { Button, Col, Form, Icon, Input, Row } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  emitDeleteProperty,
  emitPatchProperty,
  socket
} from "../../sockets/sockets";
import { userId } from "../../utils";

const Properties = ({ vehicleConfig }) => {
  if (!vehicleConfig.properties) vehicleConfig.properties = {};
  const fixedProps = Object.keys(vehicleConfig);
  fixedProps.splice(fixedProps.indexOf("properties"), 1);

  const [config, setConfig] = useState(vehicleConfig);

  useEffect(() => {
    setConfig(vehicleConfig);
  }, [vehicleConfig]);

  const elRef = useRef([]);
  useEffect(() => {
    // long to short will have trailing nulls
    elRef.current = elRef.current.slice(0, config.properties.length);
  });

  const [pendingUpdate, setPendingUpdate] = useState([]);

  const updateConfigHelper = (key, value) => {
    let newConfig = { ...config };
    newConfig.properties[key] = value;
    setConfig(newConfig);
  };

  const updateProperty = (key, value) => {
    updateConfigHelper(key, value);
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
        if (err) return console.log("************ emit patch err");
        // remove key from pendingUpdate
        // change to flash error
        // dont setConfig

        // remove from pending
        // add to pending config as delivered
        // set to delivered

        updateConfigHelper(newKey, newValue);
      }
    );

    setNewKey("");
    setNewValue();
  };

  // kind of hacky - duplicate listeners per vehicle, per rerender
  if (!socket.hasListeners("acknowledge update to control")) {
    socket.on("acknowledge update to control", ({ key, value, id }) => {
      axios({
        method: "patch",
        url: `http://${process.env.REACT_APP_DEV_SERVER}/vehicles/${id}`,
        data: {
          key,
          value
        }
      })
        .then(() => {
          updateConfigHelper(key, value);
          // remove delivered, flash success
        })
        .catch(err => console.log("************ addProperty err", err));
    });
  }
  if (!socket.hasListeners("pending update from controller")) {
    socket.on(
      "pending update from controller",
      ({ newKey: key, newValue: value }) => {
        updateConfigHelper(key, value);
      }
    );
  }

  if (!socket.hasListeners("acknowledge delete to control")) {
    socket.on("acknowledge delete to control", ({ key, origin, id }) => {
      axios({
        method: "delete",
        url: `http://${process.env.REACT_APP_DEV_SERVER}/vehicles/${id}`,
        data: {
          key
        }
      })
        .then(() => {
          let newProps = { ...config };
          delete newProps.properties[key];
          setConfig(newProps);
          // remove delivered, flash success
        })
        .catch(err => console.log("************ end delete err", err));
    });
  }

  const deleteProperty = async key => {
    emitDeleteProperty(
      { key, id: vehicleConfig._id, origin: userId },
      (err, res) => {
        if (err) return console.log("emit delete err");
        // delete from sever
        // set to pending
      }
    );
  };

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
      // send patch to socket
      emitPatchProperty(
        {
          origin: userId,
          newKey: key,
          newValue: config.properties[key],
          id: vehicleConfig._id
        },
        (err, res) => {
          if (err) return console.log("************ emit patch err");

          axios({
            method: "patch",
            url: `http://${process.env.REACT_APP_DEV_SERVER}/vehicles/${config._id}`,
            data: {
              key,
              value: elRef.current[refIdx].state.value
            }
          })
            .then(res => {
              console.log("************toggleEnableInput res", res);
            })
            .catch(err =>
              console.log("************toggleEnableInput err", err)
            );
          // send patch to server
          // revert to previous config (might need to have pendingConfig)
        }
      );
    }
  };
  if (!socket.hasListeners("acknowledge update to control")) {
    socket.on("acknowledge update to control", ({ key, value, id, origin }) => {
      console.log(
        "************ acknowledge update to control",
        key,
        value,
        id,
        origin
      );
      if (origin !== userId) {
        updateConfigHelper(key, value);
        return;
      }
      axios({
        method: "patch",
        url: `http://${process.env.REACT_APP_DEV_SERVER}/vehicles/${id}`,
        data: {
          key,
          value
        }
      })
        .then(() => {
          updateConfigHelper(key, value);
          // remove delivered, flash success
        })
        .catch(err => console.log("************ addProperty err", err));
    });
  }

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
            <Input disabled value={config[key]}></Input>
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
                  value={config.properties[key]}
                  onChange={e => updateProperty(key, e.target.value)}
                  ref={el => (elRef.current[refIdx] = el)}
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
