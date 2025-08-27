'use strict';

import fs from 'fs';
import path from 'path';
import process from 'process';
import { Sequelize } from 'sequelize';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const configPath = path.join(__dirname, '/../config/config.json');
const configFile = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const config = configFile[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const modelFiles = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') === -1
  );
});

for (const file of modelFiles) {
  const moduleUrl = pathToFileURL(path.join(__dirname, file)).href;
  const modelModule = await import(moduleUrl);
  const initModel =
    modelModule.default ?? modelModule[Object.keys(modelModule)[0]];
  if (typeof initModel === 'function') {
    const model = initModel(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
