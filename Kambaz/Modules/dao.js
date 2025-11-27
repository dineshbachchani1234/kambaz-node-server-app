/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function ModulesDao(db) {
  async function findModulesForCourse(courseId) {
    const modules = await model.find({ course: courseId });
    return modules;
  }
  
  async function createModule(courseId, module) {
    const newModule = { 
      ...module, 
      _id: uuidv4(), 
      course: courseId,
      lessons: module.lessons || []
    };
    
    try {
      const created = await model.create(newModule);
      return created;
    } catch (error) {
      console.error("Error creating module:", error);
      throw error;
    }
  }
  
  async function deleteModule(courseId, moduleId) {
    const result = await model.deleteOne({ _id: moduleId });
    return result;
  }
  
  async function updateModule(courseId, moduleId, moduleUpdates) {
    const result = await model.updateOne({ _id: moduleId }, { $set: moduleUpdates });
    return result;
  }
  
  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
}