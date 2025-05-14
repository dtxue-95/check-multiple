// import React, { useEffect, useState } from "react";
// import { Button, Checkbox, Modal, Select, message } from "antd";
// import type { ModuleData, PermissionData, PermissionItem } from "../../types";
// import { mockData } from "../../mock";

// // 类型定义已简化
// export type PermissionMode = boolean; // true: 读写, false: 只读

// const PermissionManagement: React.FC = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [permissionData, setPermissionData] = useState<PermissionData>({ modules: [] });
//   const [initialData, setInitialData] = useState<PermissionData>({ modules: [] });

//   // 深层克隆函数
//   const deepClone = (data: PermissionData) => JSON.parse(JSON.stringify(data));

//   useEffect(() => {
//     const data = deepClone(mockData);
//     setPermissionData(data);
//     setInitialData(data);
//   }, []);

//   const updateModuleState = (modules: ModuleData[], moduleId: string, updater: (module: ModuleData) => void) => {
//     return modules.map(module => {
//       if (module.id === moduleId) {
//         const updated = { ...module };
//         updater(updated);
//         return updated;
//       }
//       return module;
//     });
//   };

//   const handleModuleCheck = (moduleId: string, checked: boolean) => {
//     setPermissionData(prev => ({
//       modules: updateModuleState(prev.modules, moduleId, (module) => {
//         module.checked = checked;
//         module.items = module.items.map(item => ({
//           ...item,
//           checked,
//           mode: checked ? false : undefined // 默认只读
//         }));
//       })
//     }));
//   };

//   const handleItemCheck = (moduleId: string, itemId: string, checked: boolean) => {
//     setPermissionData(prev => ({
//       modules: updateModuleState(prev.modules, moduleId, (module) => {
//         module.items = module.items.map(item =>
//           item.id === itemId
//             ? { ...item, checked, mode: checked ? false : undefined }
//             : item
//         );
//         module.checked = module.items.every(item => item.checked);
//       })
//     }));
//   };

//   const handleModeChange = (moduleId: string, itemId: string, mode: boolean) => {
//     setPermissionData(prev => ({
//       modules: updateModuleState(prev.modules, moduleId, (module) => {
//         module.items = module.items.map(item =>
//           item.id === itemId ? { ...item, mode } : item
//         );
//       })
//     }));
//   };

//   const renderPermissionItem = (module: ModuleData, item: PermissionItem) => (
//     <div key={item.id} className="permission-item">
//       <Checkbox
//         checked={item.checked}
//         onChange={e => handleItemCheck(module.id, item.id, e.target.checked)}
//       >
//         {item.name}
//       </Checkbox>
//       {item.checked && (
//         <Select
//           value={item.mode}
//           style={{ width: 65 }}
//           size="small"
//           onChange={(value: boolean) => handleModeChange(module.id, item.id, value)}
//         >
//           <Select.Option value={false}>只读</Select.Option>
//           <Select.Option value={true}>读写</Select.Option>
//         </Select>
//       )}
//     </div>
//   );

//   const renderPermissionModule = (module: ModuleData) => (
//     <div key={module.id} className="permission-card">
//       <div className="permission-header">
//         <Checkbox
//           checked={module.checked}
//           onChange={e => handleModuleCheck(module.id, e.target.checked)}
//         >
//           {module.name}
//         </Checkbox>
//       </div>
//       <div className="permission-items">
//         {module.items.map(item => renderPermissionItem(module, item))}
//       </div>
//     </div>
//   );

//   return (
//     // ...保持相同的JSX结构
//   );
// };

// // 更新后的mock数据
// export const mockData: PermissionData = {
//   modules: [
//     {
//       id: "1",
//       name: "用户管理",
//       checked: true,
//       items: [
//         { id: "1-1", name: "用户查询", mode: false, checked: true },
//         { id: "1-2", name: "用户新增", mode: true, checked: true },
//         { id: "1-3", name: "用户删除", mode: undefined, checked: false },
//         { id: "1-4", name: "用户修改", mode: true, checked: true },
//       ],
//     },
//     // 其他模块类似修改...
//   ],
// };
