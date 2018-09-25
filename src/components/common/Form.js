import Joi from "joi-browser";

const validateAllFields = (
  fieldsObject,
  schema,
  mappings = { abortEarly: false }
) => {
  let result = Joi.validate(fieldsObject, schema, mappings);
  let errors = [];
  if (result.error) {
    result.error.details.forEach(detail => {
      errors.push({ key: detail.context.key, value: detail.message });
    });
  }
  return errors;
};
const validateField = (
  fieldObject,
  schema,
  mappings = { abortEarly: true }
) => {
  let result = Joi.validate(fieldObject, schema, mappings);
  let error = {};
  if (result.error) {
    error.key = result.error.details[0].context.key;
    error.value = result.error.details[0].message;
  }
  return error;
};

const Form = {
  validateAllFields,
  validateField
};

export default Form;
