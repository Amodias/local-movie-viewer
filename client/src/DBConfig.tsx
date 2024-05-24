//DBConfig.js|tsx

const DBConfig = {
  name: "MyDB",
  version: 1,
  objectStoresMeta: [
    {
      store: "movies",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "url", keypath: "url", options: { unique: false } },
      ],
    },
  ],
};

export default DBConfig;
