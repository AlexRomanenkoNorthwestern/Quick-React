// Returns if two courses are offered in the same term
const hasCommonTerm = (selectedCourse, course) =>
    selectedCourse.term === course.term;

// Returns if two courses are offered on the same day
const hasCommonDay = (selectedCourse, course) =>
{
    const selectedCourseMeets = selectedCourse.meets;
    const courseMeets = course.meets;
    return ((selectedCourseMeets.search('M') >= 0 && courseMeets.search('M') >= 0)
     || (selectedCourseMeets.search('Tu') >= 0 && courseMeets.search('Tu') >= 0)
     || (selectedCourseMeets.search('W') >= 0 && courseMeets.search('W') >= 0)
     || (selectedCourseMeets.search('Th') >= 0 && courseMeets.search('Th') >= 0)
     || (selectedCourseMeets.search('F') >= 0 && courseMeets.search('F') >= 0)
    );
};

// Returns if two courses are offered at the same time
const hasCommonTime = (selectedCourse, course) =>
{
    // convert times to decimals
    const selectedCourseTimes = selectedCourse.meets.replaceAll(':', '.')
        .split(' ')[1].split('-');

    const courseTimes = course.meets.replaceAll(':', '.').split(' ')[1]
        .split('-');

    // No overlapping time if course start is after selectedCourse end
    // or course end is before selectedCourse start
    return !((+ courseTimes[0]) > (+ selectedCourseTimes[1]) 
          || (+ courseTimes[1]) < (+ selectedCourseTimes[0]));
};

// Returns a list of all conflicting courses for a given selected course
const getConflictingCourses = (selectedCourse, courses) =>
{
    // Get all courses that have the same term as the selected course and map to course array
    const coursesCommonTerm = Object.values(courses).filter(
        (course) => hasCommonTerm(selectedCourse, course));

    if (coursesCommonTerm.length == 0) return [];

    // Of these courses, get all that have a shared day with the selected course
    const coursesCommonDay = coursesCommonTerm.filter(
        (course) => hasCommonDay(selectedCourse, course));
    if (coursesCommonDay.length == 0) return [];

    // Of these courses, get all that have an overlapping time with the selected course
    const coursesCommonTime = coursesCommonDay.filter(
        (course) => hasCommonTime(selectedCourse, course));
  
    return coursesCommonTime;
};

const getUnselectableCourses = (selectedCourses, courses) => 
{
    // Gets an Array of Arrays
    const unselectableCourses2D = selectedCourses.map(
        (selectedCourse) => getConflictingCourses(selectedCourse, courses));

    // Convert an Array of Arrays into a single Array
    const unselectableCourses1D = [].concat(...unselectableCourses2D);

    // remove selected courses from unselectable courses
    const selectedCoursesNumbers = selectedCourses.map((course) => course.number);

    const unselectableCourses = unselectableCourses1D.filter((course) => 
        !selectedCoursesNumbers.includes(course.number));

    return unselectableCourses;
};

export default getUnselectableCourses;