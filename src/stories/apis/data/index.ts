class StubManager<Data extends { id: number }> {
  protected id: number;
  protected data: Data[];
  protected initialDataArray: Data[];

  public constructor(initialDataArray: Data[] = []) {
    this.id = initialDataArray.length;
    this.data = [...initialDataArray];
    this.initialDataArray = [...initialDataArray];
  }

  public createStub({ ...data }: Partial<Data>): Data {
    if (isNaN(Number(data?.id))) {
      ++this.id;
    }

    return {
      id: this.id,
      ...data,
    } as Data;
  }

  public get() {
    return [...this.data];
  }

  public add(...args: Parameters<this['createStub']>) {
    const data = this.createStub.call(this, ...args);
    this.data.push(data);

    return data;
  }

  public update(data: Partial<Data> & { id: number }) {
    const target = this.data.find(({ id }) => id === data?.id);

    if (!target) throw Error('Stub Manager : update failed');

    Object.keys(data).forEach((key) => {
      if (Object.hasOwnProperty.call(target, key)) {
        Object.defineProperty(target, key, {
          value: data[key as keyof typeof data],
          configurable: true,
          enumerable: true,
          writable: true,
        });
      }
    });

    return target;
  }

  public delete(dataId: number) {
    const index = this.data.findIndex(({ id }) => id === dataId);

    if (index === -1) throw Error('Stub Manager : delete failed');

    return this.data.splice(index, 1)[0];
  }

  public clear(forceClear?: boolean) {
    if (forceClear) {
      this.id = 0;
      this.data = [];
    } else {
      this.id = this.initialDataArray.length;
      this.data = [...this.initialDataArray];
    }
  }

  public getId() {
    return this.id;
  }
}

export default StubManager;
