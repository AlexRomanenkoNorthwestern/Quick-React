import { useState } from 'react';
import CourseList from './CourseList';
import TermSelector from './TermSelector';
import Terms from './TermConstants';
import Modal from './Modal';
import CoursePlan from './CoursePlan';
import getUnselectableCourses from '../utilities/timeConflicts';

const CoursePage = ({courses}) => {
    // Term Selection
    const [buttonSelection, setSelection] = useState(() => Terms[0]);
    
    // Course Selection
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [unselectableCourses, setUnselectableCourses] = useState([]);

    const toggleSelected = (item) => 
    {
      if (!unselectableCourses.includes(item))
      {
        setSelectedCourses(
          selectedCourses.includes(item)
          ? selectedCourses.filter(x => x !== item)
          : [...selectedCourses, item]
        );

        const selectedCoursesWithNewCourse = selectedCourses.includes(item)
        ? selectedCourses.filter(x => x !== item)
        : [...selectedCourses, item];

        setUnselectableCourses(
          getUnselectableCourses(selectedCoursesWithNewCourse, courses)
        );
      };
    };

    // Pop Up
    const [open, setOpen] = useState(false);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    return (
      <div>
        <nav className="d-flex">
          <TermSelector selection={buttonSelection} setSelection={setSelection} />
          <button className="btn btn-outline-dark" style={{position:'absolute', right:'12.8%'}}
            onClick={openModal}><i className="bi bi-calendar-check"></i> Course Plan
          </button>
        </nav>
        <Modal open={open} close={closeModal}>
          <CoursePlan selected={selectedCourses} />
        </Modal>
        <CourseList selection={buttonSelection} 
                    courses={courses} 
                    selectedCourses={selectedCourses}
                    unselectableCourses={unselectableCourses}
                    toggleSelected={toggleSelected}/>
      </div>
    );
  };  

  export default CoursePage;
