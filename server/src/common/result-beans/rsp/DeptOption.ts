export class DeptOption {
  constructor(id, name, parentId) {
    this.id = id;
    this.name = name;
    this.parentId = parentId;
  }
  id: number;
  name: string;
  parentId: string;
}

export class MenuOption {
  constructor(id, name, type, parentId) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.parentId = parentId;
  }
  id: number;
  type: number;
  name: string;
  parentId: string;
}
