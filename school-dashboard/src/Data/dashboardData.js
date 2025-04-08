import studentsImg from "../assets/students.jpg";
import teachersImg from "../assets/teachers.avif";
import coursesImg from "../assets/courses.jpg";
import financeImg from "../assets/finances.jpg";
import settingsImg from "../assets/settings.jpg";

const dashboardData = [
  {
    title: "Students",
    image: studentsImg,
    description: "Manage student records, admissions, and academic performance.",
    link: "/students"
  },
  {
    title: "Teachers",
    image: teachersImg,
    description: "View and manage teacher details, subjects, and experience.",
    link: "/teachers"
  },
  {
    title: "Courses",
    image: coursesImg,
    description: "Manage available courses, assign instructors, and track progress.",
    link: "/courses"
  },
  {
    title: "Finance",
    image: financeImg,
    description: "Handle school fees, invoices, and financial reports.",
    link: "/finance"
  },
  {
    title: "Settings",
    image: settingsImg,
    description: "Customize school settings, user roles, and system configurations.",
    link: "/settings"
  }
  
];

export default dashboardData;
