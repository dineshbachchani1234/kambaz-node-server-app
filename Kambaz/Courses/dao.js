/* eslint-disable @typescript-eslint/no-unused-vars */
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() };
  return model.create(newCourse);
}

function findAllCourses() {
  return model.find();
}

function findCoursesForEnrolledUser(userId) {
  return model.find({}, { name: 1, description: 1 });
}

function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}

function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}

export default function CoursesDao() {
  return {
    createCourse,
    findAllCourses,
    findCoursesForEnrolledUser,
    deleteCourse,
    updateCourse,
  };
}