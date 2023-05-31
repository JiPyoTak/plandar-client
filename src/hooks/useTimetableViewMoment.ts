import { createContext, useContext } from 'react';

import moment, { Moment } from 'moment';

const Context = createContext<Moment>(moment());

const TimetableViewMomentProvider = Context.Provider;

const useTimetableViewMoment = () => {
  const moment = useContext(Context);
  return moment;
};

export { TimetableViewMomentProvider };
export default useTimetableViewMoment;
