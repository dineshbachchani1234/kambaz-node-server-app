/* eslint-disable @typescript-eslint/no-unused-vars */
import model from "./model.js";

export default function EnrollmentsDao(db) {
  
  
    async function findCoursesForUser(userId) {
      
      const enrollments = await model.find({ user: userId }).populate("course");
      
      const courses = enrollments.map((enrollment) => enrollment.course);
      
      return courses;
    }

  async function findUsersForCourse(courseId) {
    
    
    const totalEnrollments = await model.countDocuments({});
   
    
    const sampleEnrollments = await model.find({}).limit(3);
    
    
    const enrollments = await model.find({ course: courseId }).populate("user");
    
    
    const users = enrollments.map((enrollment) => enrollment.user);
    
    return users;
  }

  function enrollUserInCourse(userId, courseId) {
    
    const enrollment = {
      user: userId,
      course: courseId,
      _id: `${userId}-${courseId}`,
    };
    
    
    return model.create(enrollment);
  }

  function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
  }

  function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }

  return {
    findCoursesForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
  };
}