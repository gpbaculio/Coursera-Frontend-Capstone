import {PropsWithChildren, useEffect, useId, useState} from 'react';

import {useFormik} from 'formik';
import classNames from 'classnames';
import * as Yup from 'yup';

import {fetchAPI} from '../../utils';

export type FormDataType = {
  date: string;
  time: string;
  numberOfGuests: number;
  occasion: string;
};

type BookingFormProps = PropsWithChildren<{
  onSubmit: (values: FormDataType) => void;
}>;

const currentDate = new Date();
const day = currentDate.getUTCDate();
const month = currentDate.getUTCMonth() + 1;

const initialDate = `${currentDate.getUTCFullYear()}-${
  month < 10 ? `0${month}` : month
}-${day < 10 ? `0${day}` : day}`;

const initialTimes = [
  '17:00',
  '17:30',
  '20:00',
  '20:30',
  '22:30',
  '23:00',
  '23:30',
];

function BookingForm({onSubmit}: BookingFormProps) {
  const [timeOptions, setTimeOptions] = useState(initialTimes);

  const formik = useFormik({
    initialValues: {
      date: initialDate,
      time: '17:00',
      numberOfGuests: 1,
      occasion: 'Birthday',
    },
    validationSchema,
    onSubmit: values => {
      onSubmit(values);
    },
  });

  const dateError = formik.touched.date && formik.errors.date;
  const timeError = formik.touched.time && formik.errors.time;
  const numberOfGuestsError =
    formik.touched.numberOfGuests && formik.errors.numberOfGuests;
  const occasionError = formik.touched.occasion && formik.errors.occasion;

  useEffect(() => {
    if (!dateError && formik.values.date) {
      const result = fetchAPI(new Date(formik.values.date));
      setTimeOptions(result);
    }
  }, [formik.values.date, dateError]);

  const id = useId();

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>Book Now</h1>
      <div className="book-item">
        <label htmlFor="res-date">Choose date</label>
        <input
          type="date"
          id="res-date"
          name="date"
          data-testid="date"
          role="textbox"
          min={initialDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.date}
          className={classNames({inputError: dateError})}
        />
        {dateError ? (
          <span className="errorMsg">{formik.errors.date}</span>
        ) : null}
      </div>
      <div className="book-item">
        <label htmlFor="res-time">Choose time</label>
        <select
          id="res-time "
          data-testid="time"
          name="time"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.time}
          className={classNames({inputError: timeError})}>
          {timeOptions.map((o, index) => (
            <option key={`${id}-${index}`} value={o}>
              {o}
            </option>
          ))}
        </select>
        {timeError ? (
          <span className="errorMsg">{formik.errors.time}</span>
        ) : null}
      </div>
      <div className="book-item">
        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          placeholder="1"
          min="1"
          data-testid="guests"
          max="10"
          id="guests"
          name="numberOfGuests"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.numberOfGuests}
          className={classNames({inputError: numberOfGuestsError})}
        />
        {numberOfGuestsError ? (
          <span className="errorMsg">{formik.errors.numberOfGuests}</span>
        ) : null}
      </div>
      <div className="book-item">
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          name="occasion"
          data-testid="occasion"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.occasion}
          className={classNames({inputError: occasionError})}>
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
        </select>
        {occasionError ? (
          <span className="errorMsg">{formik.errors.occasion}</span>
        ) : null}
      </div>
      <input
        type="submit"
        data-testid="submit-btn"
        id="submit-btn"
        value="Make Your reservation"
      />
    </form>
  );
}

export default BookingForm;

const validationSchema = Yup.object({
  date: Yup.string().required('Date is Required'),
  time: Yup.string().required('Time is Required'),
  numberOfGuests: Yup.string().required('Number of Guests is Required'),
  occasion: Yup.string().required('Occasion is Required'),
});
