const Course = ({course}) => (
    <text>
        {course.term}{" CS: "}{course.title}<br/>
    </text>
);

const CourseList = ({courses}) => (
  <div>
    { Object.entries(courses).map(([id, course]) => <Course key={id} course={course} />) }
  </div>
);

export default CourseList;