import { v4 as uuidv4 } from "uuid";

export default function ModulesDao(db) {
  let { modules } = db;
  
  function findModulesForCourse(courseId) {
    return modules.filter((module) => module.course === courseId);
  }
  
  function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    db.modules = [...db.modules, newModule];
    modules = db.modules;
    return newModule;
  }
  
  function deleteModule(moduleId) {
    db.modules = modules.filter((module) => module._id !== moduleId);
    modules = db.modules;
  }
  
  function updateModule(moduleId, moduleUpdates) {
    const module = modules.find((module) => module._id === moduleId);
    Object.assign(module, moduleUpdates);
    return module;
  }
  
  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
}