import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  let { enrollments } = db;
  
  function enrollUserInCourse(userId, courseId) {
    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
    db.enrollments = [...db.enrollments, newEnrollment];
    enrollments = db.enrollments;
  }
  
  function unenrollUserFromCourse(userId, courseId) {
    db.enrollments = enrollments.filter(
      (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
    );
    enrollments = db.enrollments;
  }
  
  function findEnrollmentsForUser(userId) {
    return enrollments.filter((enrollment) => enrollment.user === userId);
  }
  
  return { 
    enrollUserInCourse, 
    unenrollUserFromCourse,
    findEnrollmentsForUser,
  };
}