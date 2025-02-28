import React from 'react';
import PropTypes from 'prop-types';
import BridgeModel from '../models/BridgeModel.js';
import NetDevParams, { NetDevSet } from './NetDevParams.js';

export default function Bridge(props) {
  const ports = props.item.ports || [];
  const {id, name, type, devparams} = props.item;

  function setDevParams(newDevparams) {
    const model = new BridgeModel(id, name, type, ports, newDevparams);
    props.onChange(model);
  }

  function setPorts(newPorts) {
    const model = new BridgeModel(id, name, type, newPorts, devparams);
    props.onChange(model);
  }

  const disableNsChange = ports.length > 0;

  return (
    <>
      <NetDevParams key="netdev" onChange={setDevParams} item={devparams}
        disableNsChange={disableNsChange} />
      <NetDevSet title="Ports" key="portlist" onChange={setPorts}
        value={ports} pred={(d) => d.netns == devparams.netns} />
    </>
  );
}

Bridge.propTypes = {
  item: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
