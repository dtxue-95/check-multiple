import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Modal, Select, message } from 'antd';

// 权限编辑器核心组件
const PermissionEditor = ({ initialData, onChange }) => {
  const [permissionData, setPermissionData] = useState(initialData);

  // 当初始数据变化时更新状态
  useEffect(() => {
    setPermissionData(deepClone(initialData));
  }, [initialData]);

  // 深拷贝函数
  const deepClone = (data) => JSON.parse(JSON.stringify(data));

  // 更新模块状态
  const updateModuleState = (moduleId, updater) => {
    setPermissionData(prev => {
      const newModules = prev.modules.map(module => {
        if (module.id === moduleId) {
          const updated = { ...module };
          updater(updated);
          return updated;
        }
        return module;
      });
      const newData = { modules: newModules };
      onChange(newData); // 实时通知父组件数据变化
      return newData;
    });
  };

  // 处理模块勾选
  const handleModuleCheck = (moduleId, checked) => {
    updateModuleState(moduleId, (module) => {
      module.checked = checked;
      module.items = module.items.map(item => ({
        ...item,
        checked,
        mode: checked ? false : undefined
      }));
    });
  };

  // 处理子项勾选
  const handleItemCheck = (moduleId, itemId, checked) => {
    updateModuleState(moduleId, (module) => {
      module.items = module.items.map(item => 
        item.id === itemId 
          ? { ...item, checked, mode: checked ? false : undefined }
          : item
      );
      module.checked = module.items.every(item => item.checked);
    });
  };

  // 处理权限模式修改
  const handleModeChange = (moduleId, itemId, mode) => {
    updateModuleState(moduleId, (module) => {
      module.items = module.items.map(item =>
        item.id === itemId ? { ...item, mode } : item
      );
    });
  };

  // 渲染权限子项
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

  // 渲染权限模块
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
      {permissionData.modules.map(module => renderPermissionModule(module))}
    </div>
  );
};

// 主组件
const PermissionManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentData, setCurrentData] = useState(mockData);
  
  // 处理保存操作
  const handleSave = (newData) => {
    setCurrentData(newData);
    message.success('保存成功');
    console.log('最新权限数据:', newData);
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        打开项目权限配置
      </Button>
      
      <Modal
        title="项目权限配置"
        visible={isModalVisible}
        centered
        onCancel={() => setIsModalVisible(false)}
        onOk={() => handleSave(currentData)}
        okText="保存"
        cancelText="取消"
        width={800}
      >
        <PermissionEditor 
          initialData={currentData}
          onChange={setCurrentData}
        />
      </Modal>
    </div>
  );
};

// Mock数据
const mockData = {
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
    // 其他模块数据...
  ],
};

export default PermissionManagement;


// // 添加样式优化
// import './permission-management.css';

// // 添加PropTypes验证
// PermissionEditor.propTypes = {
//   initialData: PropTypes.object.isRequired,
//   onChange: PropTypes.func.isRequired
// };

// // 使用React.memo优化组件性能
// const MemoEditor = React.memo(PermissionEditor);