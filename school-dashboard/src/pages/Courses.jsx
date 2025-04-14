import React, { useState, useEffect } from "react";
import AddCourseForm from "../components/courses/AddCourseForm";
import EditCourseForm from "../components/courses/EditCourseForm";
import CourseList from "../components/courses/CourseList";
import SortFilterControls from "../components/courses/SortFilterControls";
import "../styles/Courses.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  fetchCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../services/courseService";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [sortOption, setSortOption] = useState("name");
  const [filterInstructor, setFilterInstructor] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const res = await fetchCourses();
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  const handleAddCourse = async (newCourse) => {
    try {
      const res = await addCourse(newCourse);
      setCourses((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding course:", err);
    }
  };

  const handleUpdateCourse = async (updatedCourse) => {
    try {
      const res = await updateCourse(updatedCourse.id, updatedCourse);
      setCourses((prev) =>
        prev.map((c) => (c.id === res.data.id ? res.data : c))
      );
      setEditingCourse(null);
    } catch (err) {
      console.error("Error updating course:", err);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await deleteCourse(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  const sortedCourses = [...courses].sort((a, b) => {
    if (sortOption === "name") return a.name.localeCompare(b.name);
    if (sortOption === "duration") return a.duration - b.duration;
    return 0;
  });

  const filteredCourses = sortedCourses.filter((course) =>
    filterInstructor
      ? course.instructor
          .toLowerCase()
          .includes(filterInstructor.toLowerCase())
      : true
  );

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={12}>
          <h2 className="text-center course-header">📚 Available Courses</h2>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <SortFilterControls
              sortOption={sortOption}
              setSortOption={setSortOption}
              instructorFilter={filterInstructor}
              setInstructorFilter={setFilterInstructor}
            />
          </Card>

          <Card className="p-3 mt-3 shadow-sm">
            <AddCourseForm onAddCourse={handleAddCourse} />
          </Card>
        </Col>

        <Col md={8}>
          <Card className="p-3 shadow-sm">
            {editingCourse && (
              <EditCourseForm
                course={editingCourse}
                onUpdateCourse={handleUpdateCourse}
                onCancel={() => setEditingCourse(null)}
              />
            )}

            <CourseList
              courses={filteredCourses}
              onEdit={setEditingCourse}
              onDelete={handleDeleteCourse}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Courses;
