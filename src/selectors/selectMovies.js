import moment from 'moment';

// Get visible movies

export default (movies, { text, sortBy, startDate, endDate }) => {
  return movies.filter((movie) => {
    const createdAtMoment = moment(movie.year);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
    const textMatch = movie.movieName.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  })
};
