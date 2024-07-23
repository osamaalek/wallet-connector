// Mock the import.meta.env object
global.importMetaEnv = {
    MY_CHAIN_ID: '11155111',
  };
  
  // Mock import.meta object
  global.importMeta = {
    env: global.importMetaEnv,
  };
  
  // Workaround for import.meta.env in Jest
  Object.defineProperty(global, 'import', {
    value: {
      meta: global.importMeta,
    },
  });
  
  // Check if window is defined and has ethereum property
  if (typeof window !== 'undefined' && window.ethereum) {
    window.ethereum.request = jest.fn();
  } else {
    global.window = Object.create(window);
    global.window.ethereum = {
      request: jest.fn(),
    };
  }
  
  // Mocking localStorage
  global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
  