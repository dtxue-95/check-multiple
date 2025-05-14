import React, { useEffect, useState } from "react";
import { Button, Checkbox, Modal, Select, message } from "antd";

const deepClone = (data) => JSON.parse(JSON.stringify(data));

export const mockData = {
  modules: [
    {
      id: "1",
      name: "用户管理",
      checked: true,
      items: [
        { id: "1-1", name: "用户查询", mode: false, checked: true },
        { id: "1-2", name: "用户新增", mode: true, checked: true },
        { id: "1-3", name: "用户删除", mode: undefined, checked: false },
        { id: "1-4", name: "用户修改", mode: true, checked: true },
      ],
    },
    {
      id: "2",
      name: "角色管理",
      checked: true,
      items: [
        { id: "2-1", name: "角色查询", mode: false, checked: true },
        { id: "2-2", name: "角色新增", mode: true, checked: true },
        { id: "2-3", name: "角色删除", mode: undefined, checked: false },
        { id: "2-4", name: "角色修改", mode: true, checked: true },
      ],
    },
    {
      id: "3",
      name: "权限管理",
      checked: true,
      items: [
        { id: "3-1", name: "权限查询", mode: false, checked: true },
        { id: "3-2", name: "权限新增", mode: true, checked: true },
        { id: "3-3", name: "权限删除", mode: undefined, checked: false },
        { id: "3-4", name: "权限修改", mode: true, checked: true },
      ],
    },
  ],
};

const PermissionManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [permissionData, setPermissionData] = useState({ modules: [] });
  const [initialData, setInitialData] = useState({ modules: [] });

  useEffect(() => {
    const data = deepClone(mockData);
    setPermissionData(data);
    setInitialData(data);
  }, []);

  const updateModuleState = (modules, moduleId, updater) => {
    return modules.map(module => {
      if (module.id === moduleId) {
        const updated = { ...module };
        updater(updated);
        return updated;
      }
      return module;
    });
  };

  const handleModuleCheck = (moduleId, checked) => {
    setPermissionData(prev => ({
      modules: updateModuleState(prev.modules, moduleId, (module) => {
        module.checked = checked;
        module.items = module.items.map(item => ({
          ...item,
          checked,
          mode: checked ? false : undefined
        }));
      })
    }));
  };

  const handleItemCheck = (moduleId, itemId, checked) => {
    setPermissionData(prev => ({
      modules: updateModuleState(prev.modules, moduleId, (module) => {
        module.items = module.items.map(item => 
          item.id === itemId 
            ? { ...item, checked, mode: checked ? false : undefined }
            : item
        );
        module.checked = module.items.every(item => item.checked);
      })
    }));
  };

  const handleModeChange = (moduleId, itemId, mode) => {
    setPermissionData(prev => ({
      modules: updateModuleState(prev.modules, moduleId, (module) => {
        module.items = module.items.map(item =>
          item.id === itemId ? { ...item, mode } : item
        );
      })
    }));
  };

  const renderPermissionItem = (module, item) => (
    <div key={item.id} className="permission-item">
      <Checkbox
        checked={item.checked}
        onChange={e => handleItemCheck(module.id, item.id, e.target.checked)}
      >
        {item.name}
      </Checkbox>
      {item.checked && (
        <Select
          value={item.mode}
          style={{ width: 65 }}
          size="small"
          onChange={value => handleModeChange(module.id, item.id, value)}
        >
          <Select.Option value={false}>只读</Select.Option>
          <Select.Option value={true}>读写</Select.Option>
        </Select>
      )}
    </div>
  );

  const renderPermissionModule = (module) => (
    <div key={module.id} className="permission-card">
      <div className="permission-header">
        <Checkbox
          checked={module.checked}
          onChange={e => handleModuleCheck(module.id, e.target.checked)}
        >
          {module.name}
        </Checkbox>
      </div>
      <div className="permission-items">
        {module.items.map(item => renderPermissionItem(module, item))}
      </div>
    </div>
  );

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        打开项目权限配置
      </Button>
      <Modal
        title="项目权限配置"
        visible={isModalVisible}
        centered
        onCancel={() => {
          setPermissionData(deepClone(initialData));
          setIsModalVisible(false);
        }}
        onOk={() => {
          setInitialData(deepClone(permissionData));
          message.success("保存成功");
          console.log("保存数据:", permissionData);
        }}
        okText="保存"
        cancelText="取消"
      >
        <div>
          {permissionData.modules.map(module => renderPermissionModule(module))}
        </div>
      </Modal>
    </div>
  );
};

export default PermissionManagement;