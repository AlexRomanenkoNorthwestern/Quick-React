import './CourseList.css';
import { Link } from 'react-router-dom';
import {useAuthState } from '../utilities/firebase';

const Course = ({courseId, course, selectedCourses, unselectableCourses, toggleSelected}) => 
{
    const [user] = useAuthState();
    const url = user !== null ?  '/' + courseId + '/edit' : '';
    return(
    <div className ="card m-1 p-2" onClick={() => toggleSelected(course)}>
      <div className={`card-body ${selectedCourses.includes(course) ? 'selected' : 'notselected'}
      ${unselectableCourses.includes(course) ? 'unselectable' : ''}`}>
      <div>
        <h4>{course.term}{' CS '}{course.number}
          <Link to={url} className = {activation} >
            <button style ={{background:'transparent', border:'transparent'}} >
              <i className={`${ user !== null ? 'bi-pencil-square' : ''}`} style = {{color: 'grey', marginleft: '10px'}}/>
            </button>
          </Link>
        </h4>
      </div>
        {course.title}
      </div>
      <div className="card-footer bg-transparent">
        {course.meets} 
        <br></br> 
        <button className={`${'btn btn-primary'} ${unselectableCourses.includes(course) ? 'invisible' : ''}`}>
          <i className={`${selectedCourses.includes(course) ? 'bi bi-x-square-fill' : ''}
          ${unselectableCourses.includes(course) ? 'unselectable' : ''}
          ${!selectedCourses.includes(course) && !unselectableCourses.includes(course) ? 'bi bi-plus-square-fill' : ''}`}>
          </i> &nbsp; {`${selectedCourses.includes(course) ? 'Remove' : ''}`} 
          {`${!selectedCourses.includes(course) && !unselectableCourses.includes(course) ? 'Add' : ''}`}
        </button>
      </div>
    </div>
    );
  };


const CourseList = ({courses, selection, selectedCourses, unselectableCourses, toggleSelected}) => {
  return( 
  <div className="course-list">
    { 
    Object.entries(courses).map(([id, course]) => {
      if (course.term == selection) return( <Course courseId = {id} course = {course} selectedCourses = {selectedCourses} 
      unselectableCourses = {unselectableCourses} toggleSelected = {toggleSelected}/>)})
    }
  </div>
)
};

export default CourseList;
