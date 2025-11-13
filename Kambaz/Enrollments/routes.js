import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);
  
  const findAllEnrollments = (req, res) => {
    res.json(db.enrollments);
  };
  
  const enrollUserInCourse = (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    dao.enrollUserInCourse(userId, courseId);
    res.sendStatus(200);
  };
  
  const unenrollUserFromCourse = (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    dao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(200);
  };
  
  app.get("/api/enrollments", findAllEnrollments);
  app.post("/api/users/:userId/courses/:courseId/enroll", enrollUserInCourse);
  app.delete("/api/users/:userId/courses/:courseId/enroll", unenrollUserFromCourse);
}