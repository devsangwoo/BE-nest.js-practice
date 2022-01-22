export const loggerService = {
  log: (e) => {
    jest.fn(e);
  },
  error: (e) => {
    jest.fn(e);
  },
};
