/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuidv4 } from "uuid";

export default function CoursesDao(db) {
  let { courses } = db;
  
  function findAllCourses() {
    return db.courses;
  }
  
  function findCoursesForEnrolledUser(userId) {
    const enrolledCourses = db.courses.filter((course) =>
      db.enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id)
    );
    return enrolledCourses;
  }
  
  function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    db.courses = [...db.courses, newCourse];
    courses = db.courses;
    return newCourse;
  }
  
  function deleteCourse(courseId) {
    db.courses = db.courses.filter((course) => course._id !== courseId);
    db.enrollments = db.enrollments.filter((enrollment) => enrollment.course !== courseId);
    courses = db.courses;
  }
  
  function updateCourse(courseId, courseUpdates) {
    const course = db.courses.find((course) => course._id === courseId);
    Object.assign(course, courseUpdates);
    return course;
  }
  
  return {
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}