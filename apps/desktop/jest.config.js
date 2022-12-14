const { pathsToModuleNameMapper } = require("ts-jest");

const { compilerOptions } = require("./tsconfig");

const sharedConfig = require("../../libs/shared/jest.config.base");

module.exports = {
  ...sharedConfig,
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/test.setup.ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions?.paths || {}, {
    prefix: "<rootDir>/",
  }),
  globals: {
    "ts-jest": {
      ...sharedConfig.globals["ts-jest"],
      astTransformers: {
        before: ["<rootDir>/../../libs/shared/es2020-transformer.ts"],
      },
    },
  },
};
