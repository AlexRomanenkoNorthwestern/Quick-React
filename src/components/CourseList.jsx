import './CourseList.css';

const Course = ({course, selectedCourses, toggleSelected}) => (
    <div className ="card m-1 p-2" onClick={() => toggleSelected(course)}>
      <div className={`card-body ${selectedCourses.includes(course) ? 'selected' : 'notselected'}`}>
        <h4>{course.term}{' CS '}{course.number}<br/></h4>
        {course.title}
      </div>
      <div className="card-footer bg-transparent">
        {course.meets}
      </div>
    </div>
);

const CourseList = ({courses, selection, selectedCourses, toggleSelected}) => {
  return( 
  <div className="course-list">
    { 
    Object.entries(courses).map(([id, course]) => {
      if (course.term == selection) return( <Course course = {course} selectedCourses = {selectedCourses} 
      toggleSelected = {toggleSelected}/>)})
    }
  </div>
)
};

export default CourseList;
