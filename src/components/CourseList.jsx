import './CourseList.css';

const Course = ({course}) => (
    <div className ="card m-1 p-2">
      <div className="card-body">
        <h4>{course.term}{' CS '}{course.number}<br/></h4>
        {course.title}
      </div>
      <div className="card-footer bg-transparent">
        {course.meets}
      </div>
    </div>
);

const CourseList = ({courses}) => (
  <div className="course-list">
    { 
    Object.entries(courses).map(([id, course]) => <Course key={id} course={course} />) 
    }
  </div>
);

export default CourseList;