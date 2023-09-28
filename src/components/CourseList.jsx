import './CourseList.css';

const Course = ({course, selectedCourses, unselectableCourses, toggleSelected}) => (
    <div className ="card m-1 p-2" onClick={() => toggleSelected(course)}>
      <div className={`card-body ${selectedCourses.includes(course) ? 'selected' : 'notselected'}
      ${unselectableCourses.includes(course) ? 'unselectable' : ''}`}>
      <div>
        <h4>{course.term}{' CS '}{course.number}&nbsp;
          <i className={`${selectedCourses.includes(course) ? 'bi-x-square-fill' : ''}
           ${!selectedCourses.includes(course) && !unselectableCourses.includes(course) ?
            'bi-plus-square-fill' : ''}`} style = {{color: 'rgb(13,110,253)', marginleft: '10px'}}/>
        </h4>
      </div>
        {course.title}
      </div>
      <div className="card-footer bg-transparent">
        {course.meets}
      </div>
    </div>
);

const CourseList = ({courses, selection, selectedCourses, unselectableCourses, toggleSelected}) => {
  return( 
  <div className="course-list">
    { 
    Object.entries(courses).map(([id, course]) => {
      if (course.term == selection) return( <Course course = {course} selectedCourses = {selectedCourses} 
      unselectableCourses = {unselectableCourses} toggleSelected = {toggleSelected}/>)})
    }
  </div>
)
};

export default CourseList;
