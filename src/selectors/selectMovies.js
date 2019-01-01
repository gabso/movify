import moment from 'moment';

// Get visible movies

export default (movies, { text, sortBy, startDate, endDate }) => {
  return movies.filter((movie) => {
    const createdAtMoment = moment(movie.year,'YYYY');
    const startDateMatch = startDate ? moment(startDate).isSameOrBefore(createdAtMoment, 'day') : true;
    const endDateMatch = endDate ? moment(endDate).isSameOrAfter(createdAtMoment, 'day') : true;
    const textMatch = movie.movieName.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  })
};
