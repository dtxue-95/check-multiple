import React, { useEffect, useState } from "react";
import { Button, Checkbox, Modal, Select, message } from "antd";
import type {
	ModuleData,
	PermissionData,
	PermissionItem,
	PermissionMode,
} from "../../types";
import { mockData } from "../../mock";

const PermissionManagement: React.FC = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [permissionData, setPermissionData] = useState<PermissionData>({
		modules: [],
	});
	const [initialData, setInitialData] = useState<PermissionData>({
		modules: [],
	});

	useEffect(() => {
		//模拟从服务器获取数据
		const data = JSON.parse(JSON.stringify(mockData));
		setIsModalVisible(data);
		setInitialData(data);
	}, []);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setPermissionData(JSON.parse(JSON.stringify(initialData)));
		setIsModalVisible(false);
	};

	const handleOk = () => {
		setInitialData(JSON.parse(JSON.stringify(permissionData)));
		message.success("保存成功");
		// setIsModalVisible(false);
		console.log("🚀 ~ handleOk ~ permissionData:", permissionData);
	};

	const handleModuleCheck = (moduleId: string, checked: boolean) => {
		const newData = { ...permissionData };
		const moduleIndex = newData.modules.findIndex(
			(module) => module.id === moduleId
		);
		if (moduleIndex !== -1) {
			// 更新模块的选中状态
			newData.modules[moduleIndex].checked = checked;
			// 更新该模块下所有子项的选中状态和模式
			newData.modules[moduleIndex].items = newData.modules[
				moduleIndex
			].items.map((item) => ({
				...item,
				checked,
				mode: checked ? "只读" : "",
			}));
			setPermissionData(newData);
		}
	};

	const handleItemCheck = (
		moduleId: string,
		itemId: string,
		checked: boolean
	) => {
		const newData = { ...permissionData };
		const moduleIndex = newData.modules.findIndex(
			(module) => module.id === moduleId
		);
		if (moduleIndex !== -1) {
			const itemIndex = newData.modules[moduleIndex].items.findIndex(
				(item) => item.id === itemId
			);
			if (itemIndex !== -1) {
				// 更新子项的选中状态和模式
				newData.modules[moduleIndex].items[itemIndex].checked = checked;
				newData.modules[moduleIndex].items[itemIndex].mode = checked
					? "只读"
					: "";

				// 检查模块下所有子项是否都选中
				const allItemsChecked = newData.modules[moduleIndex].items.every(
					(item) => item.checked
				);
				// 更新模块的选中状态
				newData.modules[moduleIndex].checked = allItemsChecked;
				setPermissionData(newData);
			}
		}
	};

	const handleModeChange = (
		moduleId: string,
		itemId: string,
		mode: PermissionMode
	) => {
		const newData = { ...permissionData };
		const moduleIndex = newData.modules.findIndex(
			(module) => module.id === moduleId
		);
		if (moduleIndex !== -1) {
			const itemIndex = newData.modules[moduleIndex].items.findIndex(
				(item) => item.id === itemId
			);
			if (itemIndex !== -1) {
				// 更新子项的模式
				newData.modules[moduleIndex].items[itemIndex].mode = mode;
				setPermissionData(newData);
			}
		}
	};

	const renderPermissionItem = (module: ModuleData, item: PermissionItem) => {
		return (
			<div key={item.id} className='permission-item'>
				<Checkbox
					checked={item.checked}
					className='permission-checkbox'
					onChange={(e) => {
						handleItemCheck(module.id, item.id, e.target.checked);
					}}
				>
					{item.name}
				</Checkbox>
				{item.checked && (
					<Select
						value={item.mode}
						style={{ width: 65 }}
						size='small'
						className='permission-mode'
						onChange={(value: PermissionMode) =>
							handleModeChange(module.id, item.id, value)
						}
					>
						<Select.Option value='只读'>只读</Select.Option>
						<Select.Option value='读写'>读写</Select.Option>
					</Select>
				)}
			</div>
		);
	};

	const renderPermissionModule = (module: ModuleData) => {
		return (
			<div key={module.id} className='permission-card'>
				<div className='permission-header'>
					<Checkbox
						checked={module.checked}
						className='permission-checkbox'
						onChange={(e) => handleModuleCheck(module.id, e.target.checked)}
					>
						{module.name}
					</Checkbox>
				</div>
				{module.items.length > 0 && (
					<div className='permission-items'>
						{module.items.map((item) => renderPermissionItem(module, item))}
					</div>
				)}
			</div>
		);
	};
	return (
		<div>
			<Button type='primary' onClick={showModal}>
				打开项目权限配置
			</Button>
			<Modal
				title='项目权限配置'
				open={isModalVisible}
				centered
				onCancel={handleCancel}
				onOk={handleOk}
				okText='保存'
				cancelText='取消'
			>
				<div>
					{permissionData.modules.map((module) =>
						renderPermissionModule(module)
					)}
				</div>
			</Modal>
		</div>
	);
};

export default PermissionManagement;
