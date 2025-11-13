import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  let { assignments } = db;
  
  function findAssignmentsForCourse(courseId) {
    return assignments.filter((assignment) => assignment.course === courseId);
  }
  
  function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    db.assignments = [...db.assignments, newAssignment];
    assignments = db.assignments;
    return newAssignment;
  }
  
  function deleteAssignment(assignmentId) {
    db.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
    assignments = db.assignments;
  }
  
  function updateAssignment(assignmentId, assignmentUpdates) {
    const assignment = assignments.find((assignment) => assignment._id === assignmentId);
    Object.assign(assignment, assignmentUpdates);
    return assignment;
  }
  
  return {
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}