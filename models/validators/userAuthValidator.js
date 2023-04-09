const Joi = require('joi');
const schema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required().messages({
    'string.email': 'ایمیل به صورت صحیح وارد نشده است',
    'any.required': 'ایمیل باید وارد شود',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'پسورد باید حداقل دارای شش کاراکتر باشد',
  }),
  phonenumber: Joi.string()
    .regex(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/)
    .required()
    .messages({
      'string.pattern.base': 'در فرمت شماره موبایل ایران نیست',
      'any.required': 'شماره همراه باید وارد شود',
    }),
}).options({ abortEarly: false });

module.exports = schema;
