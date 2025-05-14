export type PermissionMode = "只读" | "读写" | "";

export interface PermissionItem {
	id: string;
	name: string;
	mode: PermissionMode;
	checked: boolean;
}

export interface ModuleData {
	id: string;
	name: string;
	checked: boolean;
	items: PermissionItem[];
}

export interface PermissionData {
	modules: ModuleData[];
}
