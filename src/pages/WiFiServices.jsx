import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { mockWifiDevices } from '../data/hostel';
import { Wifi, PlusCircle, CheckCircle2, Shield } from 'lucide-react';

export default function WiFiServices() {
  const [devices, setDevices] = useState(mockWifiDevices);
  const [modalOpen, setModalOpen] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('Laptop / Notebook');
  const [macAddress, setMacAddress] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!deviceName || !macAddress) {
      alert('Please fill in device name and MAC address.');
      return;
    }

    setSubmitSuccess(true);
    setTimeout(() => {
      const newDev = {
        id: devices.length + 1,
        deviceName: deviceName,
        deviceType: deviceType,
        macAddress: macAddress.toUpperCase(),
        ipAssigned: `172.16.42.${Math.floor(100 + Math.random() * 150)}`,
        registrationDate: '11-Sep-2024',
        status: 'Active / Registered',
        bandwidthLimit: '100 Mbps (Campus High Speed)'
      };
      setDevices([...devices, newDev]);
      setSubmitSuccess(false);
      setModalOpen(false);
      setDeviceName('');
      setMacAddress('');
      alert(`[DEMO]: Device "${newDev.deviceName}" MAC address registered on IMSEC Campus Wi-Fi!`);
    }, 1000);
  };

  const columns = [
    {
      header: 'Device Name / Label',
      accessor: 'deviceName',
      render: (val) => <strong style={{ color: '#253973' }}>{val}</strong>
    },
    {
      header: 'Device Type',
      accessor: 'deviceType',
      width: '180px'
    },
    {
      header: 'Hardware MAC Address',
      accessor: 'macAddress',
      width: '180px',
      render: (val) => <code>{val}</code>
    },
    {
      header: 'IP Address (DHCP)',
      accessor: 'ipAssigned',
      width: '140px',
      render: (val) => <span style={{ fontFamily: 'monospace' }}>{val}</span>
    },
    {
      header: 'Bandwidth Limit',
      accessor: 'bandwidthLimit',
      width: '200px'
    },
    {
      header: 'Status',
      accessor: 'status',
      width: '160px',
      render: (val) => <StatusBadge status={val} />
    }
  ];

  return (
    <div>
      <Breadcrumb
        title="Campus Wi-Fi Services & Device Registration"
        subtitle="Register laptop, tablet, and mobile MAC addresses for high-speed campus academic network access"
        items={[{ label: 'Wi-Fi Services', link: null }]}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
        <button
          type="button"
          className="erp-btn erp-btn-primary"
          onClick={() => setModalOpen(true)}
        >
          <PlusCircle size={14} /> Register New Device MAC Address
        </button>
      </div>

      <DataTable
        columns={columns}
        data={devices}
        searchPlaceholder="Search registered devices by MAC address, name..."
      />

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Register Wi-Fi MAC Address"
        maxWidth="500px"
        footer={
          <>
            <button
              type="button"
              className="erp-btn erp-btn-default"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="erp-btn erp-btn-primary"
              onClick={handleSubmit}
            >
              Register Device
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          {submitSuccess && (
            <div style={{ background: '#eafaf1', color: '#28a745', padding: '10px', borderRadius: '3px', marginBottom: '15px', fontSize: '12px' }}>
              <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '5px' }} />
              Device authenticated on campus network!
            </div>
          )}

          <div className="form-group">
            <label>Device Name / Model <span className="required-star">*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Lenovo ThinkPad E14"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Device Category <span className="required-star">*</span></label>
            <select
              className="form-control"
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
            >
              <option value="Laptop / Notebook">Laptop / Notebook</option>
              <option value="Mobile Smartphone">Mobile Smartphone</option>
              <option value="Tablet / iPad">Tablet / iPad</option>
            </select>
          </div>

          <div className="form-group">
            <label>Physical MAC Address (12 Hex Characters) <span className="required-star">*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. 48:2A:E3:5C:89:1B"
              value={macAddress}
              onChange={(e) => setMacAddress(e.target.value)}
              required
            />
            <div className="form-text">
              Example format: <code>AA:BB:CC:DD:EE:FF</code> or <code>AA-BB-CC-DD-EE-FF</code>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
