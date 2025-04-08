import React, { useState, useEffect } from "react";
import AddCourseForm from "../components/courses/AddCourseForm";
import EditCourseForm from "../components/courses/EditCourseForm";
import CourseList from "../components/courses/CourseList";
import SortFilterControls from "../components/courses/SortFilterControls";
import "../styles/Courses.css"; // Import styles
import { Container, Row, Col, Card } from "react-bootstrap"; // Bootstrap imports

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [editingCourse, setEditingCourse] = useState(null);
    const [sortOption, setSortOption] = useState("title");
    const [filterInstructor, setFilterInstructor] = useState("");

    useEffect(() => {
        fetch("http://localhost:4000/courses")
            .then((res) => res.json())
            .then((data) => setCourses(data))
            .catch((error) => console.error("Error fetching courses:", error));
    }, []);

    const handleAddCourse = (newCourse) => {
        setCourses([...courses, newCourse]);
    };

    const handleUpdateCourse = (updatedCourse) => {
        setCourses(courses.map(course => 
            course.id === updatedCourse.id ? updatedCourse : course
        ));
        setEditingCourse(null);
    };

    const handleDeleteCourse = (id) => {
        fetch(`http://localhost:4000/courses/${id}`, { method: "DELETE" })
            .then(() => setCourses(courses.filter(course => course.id !== id)))
            .catch((error) => console.error("Error deleting course:", error));
    };

    const sortedCourses = [...courses].sort((a, b) => {
        if (sortOption === "title") return a.title.localeCompare(b.title);
        if (sortOption === "duration") return a.duration - b.duration;
        return 0;
    });

    const filteredCourses = sortedCourses.filter(course => 
        filterInstructor ? course.instructor === filterInstructor : true
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
