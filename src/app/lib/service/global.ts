import { NodeConfig } from '../interface';

class GlobalService {

  private autoincrementId = 0;

  /** 组件数据 */
  component: {
    model: NodeConfig;
  } = {
    model: null,
  };

  getId() {
    this.autoincrementId++;
    return this.autoincrementId;
  }

  get(key: string) {
    return this[key];
  }

  getNodeId() {
    const id = this.getId();
    return `node_${this.getSep(id, 4)}`;
  }

  getSep(num: number, len: number) {
    let numStr = num.toString();
    while (numStr.length < len) {
      numStr = '0' + numStr;
    }
    return numStr;
  }

  setComponent(model: any) {
    if (!model.id) {
      model.id = this.getNodeId();
    }
    console.log('model---->', model);
    this.component.model = model;
  }
}

export default new GlobalService();
