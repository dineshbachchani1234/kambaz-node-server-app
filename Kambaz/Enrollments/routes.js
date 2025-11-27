import EnrollmentsDao from "./dao.js";
import model from "./model.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);
  
  const enrollUserInCourse = async (req, res) => {
    try {
      let { userId, courseId } = req.params;
      if (userId === "current") {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
          res.sendStatus(401);
          return;
        }
        userId = currentUser._id;
      }
      await dao.enrollUserInCourse(userId, courseId);
      res.sendStatus(200);
    } catch (error) {
      console.error("❌ ERROR IN ENROLL:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
  const unenrollUserFromCourse = async (req, res) => {
    try {
      let { userId, courseId } = req.params;
      if (userId === "current") {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
          res.sendStatus(401);
          return;
        }
        userId = currentUser._id;
      }
      await dao.unenrollUserFromCourse(userId, courseId);
      res.sendStatus(200);
    } catch (error) {
      console.error("❌ ERROR IN UNENROLL:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
  const findAllEnrollments = async (req, res) => {
    const enrollments = await model.find();
    res.json(enrollments);
  };

  app.post("/api/users/:userId/courses/:courseId/enroll", enrollUserInCourse);
  app.delete("/api/users/:userId/courses/:courseId/enroll", unenrollUserFromCourse);
  app.get("/api/enrollments", findAllEnrollments);
}