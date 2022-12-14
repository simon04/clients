const { pathsToModuleNameMapper } = require("ts-jest");

const { compilerOptions } = require("./tsconfig");

const sharedConfig = require("../../libs/shared/jest.config.base");

module.exports = {
  ...sharedConfig,
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["../../apps/web/test.setup.ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions?.paths || {}, {
    prefix: "<rootDir>/",
  }),
  modulePathIgnorePatterns: ["jslib"],
  globals: {
    "ts-jest": {
      ...sharedConfig.globals["ts-jest"],
      astTransformers: {
        before: ["<rootDir>/../../libs/shared/es2020-transformer.ts"],
      },
    },
  },
};
