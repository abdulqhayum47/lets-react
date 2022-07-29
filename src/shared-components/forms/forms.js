// Render Prop
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";


const Forms = (props) => (
  <div>
    <h1>Any place in your app!</h1>
    <Formik
      initialValues={props}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          { props.map(prop =>             
            <p>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </p>
          )}

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Forms;