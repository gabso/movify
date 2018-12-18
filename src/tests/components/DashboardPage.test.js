import React from 'react';
import { shallow } from 'enzyme';
import MoviesPage from '../../components/MoviesPage';

test('should render MoviesPage correctly', () => {
  const wrapper = shallow(<MoviesPage />);
  expect(wrapper).toMatchSnapshot();
});
