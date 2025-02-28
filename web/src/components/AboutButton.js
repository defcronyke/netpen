import React from 'react'
import { Button, Modal, Alert, Row, Col } from 'antd';
import netpen_light from '../netpen_light.png';

export default function AboutButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={handleClickOpen}>About</Button>
      <Modal title="netpen.io" visible={open} onCancel={handleClose}
        footer={null} width={600}>
        <Row gutter={[10, 20]}>
          <Col span={8} />
          <Col span={8}>
            <img src={netpen_light} className="about-img" />
          </Col>
          <Col span={8} />
          <Col span={24}>
            Visual editor and API for network environments script generation.
            <br />
            Define your network components and
            download a BASH script creating your setup.
          </Col>
          <Col>Project Page:</Col>
          <Col>
            <a href="https://github.com/ebirger/netpen.git" target="_blank"
              rel="noreferrer">
              https://github.com/ebirger/netpen.git
            </a>
          </Col>
          <Col span={24}>
            <Alert type="warning"
              message="This is alpha software. Things may break." />
          </Col>
        </Row>
      </Modal>
    </>
  );
}
