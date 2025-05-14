import type { PermissionData } from "./types";

export const mockData: PermissionData = {
	modules: [
		{
			id: "1",
			name: "用户管理",
			checked: true,
			items: [
				{
					id: "1-1",
					name: "用户查询",
					mode: "只读",
					checked: true,
				},
				{
					id: "1-2",
					name: "用户新增",
					mode: "读写",
					checked: true,
				},
				{
					id: "1-3",
					name: "用户删除",
					mode: "",
					checked: false,
				},
				{
					id: "1-4",
					name: "用户修改",
					mode: "读写",
					checked: true,
				},
			],
		},
		{
			id: "2",
			name: "角色管理",
			checked: true,
			items: [
				{
					id: "2-1",
					name: "角色查询",
					mode: "只读",
					checked: true,
				},
				{
					id: "2-2",
					name: "角色新增",
					mode: "读写",
					checked: true,
				},
				{
					id: "2-3",
					name: "角色删除",
					mode: "",
					checked: false,
				},
				{
					id: "2-4",
					name: "角色修改",
					mode: "读写",
					checked: true,
				},
			],
		},
		{
			id: "3",
			name: "权限管理",
			checked: true,
			items: [
				{
					id: "3-1",
					name: "权限查询",
					mode: "只读",
					checked: true,
				},
				{
					id: "3-2",
					name: "权限新增",
					mode: "读写",
					checked: true,
				},
				{
					id: "3-3",
					name: "权限删除",
					mode: "",
					checked: false,
				},
				{
					id: "3-4",
					name: "权限修改",
					mode: "读写",
					checked: true,
				},
			],
		},
	],
};

// // 更新后的mock数据
// export const mockData: PermissionData = {
//     modules: [
//       {
//         id: "1",
//         name: "用户管理",
//         checked: true,
//         items: [
//           { id: "1-1", name: "用户查询", mode: false, checked: true },
//           { id: "1-2", name: "用户新增", mode: true, checked: true },
//           { id: "1-3", name: "用户删除", mode: undefined, checked: false },
//           { id: "1-4", name: "用户修改", mode: true, checked: true },
//         ],
//       },
//       // 其他模块类似修改...
//     ],
//   };
