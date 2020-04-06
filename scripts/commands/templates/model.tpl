interface [name]State {
}

const [name]: IModel<[name]State> = {
  id: '[name]',
  state: {

  },
[ssr]
  // #!if !browser
  async getInitialState() {
    return { } as [name]State;
  },
  // #!endif
[/ssr]
  reducers: {

  }
};

export default [name];
