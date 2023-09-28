import { useState } from 'react';
import CourseList from './CourseList';
import TermSelector from './TermSelector';
import Terms from './TermConstants';
import Modal from './Modal';
import CoursePlan from './CoursePlan';

const CoursePage = ({courses}) => {
    // Term Selection
    const [buttonSelection, setSelection] = useState(() => Terms[0]);
    
    // Course Selection
    const [selectedCourses, setSelectedCourses] = useState([]);
    const toggleSelected = (item) => setSelectedCourses(
        selectedCourses.includes(item)
        ? selectedCourses.filter(x => x !== item)
        : [...selectedCourses, item]
      );

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
                    toggleSelected={toggleSelected}/>
      </div>
    );
  };  

  export default CoursePage;
