const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);
const schema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required().messages({
    'string.email': 'ایمیل به صورت صحیح وارد نشده است',
    'any.required': 'ایمیل باید وارد شود',
  }),
  /* password: Joi.string().min(6).required().messages({
    "string.min": "پسورد باید حداقل دارای شش کاراکتر باشد",
  }), */
  password: joiPassword
    .string()
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .onlyLatinCharacters()
    .required()
    .messages({
      'password.minOfSpecialCharacters':
        'پسورد باید حداقل دارای یک حرف خاص باشد',
      'password.minOfLowercaes': ' پسورد باید حداقل دارای یک حرف کوچک باشد',
      'password.minOfUppercase': 'پسورد باید حداقل دارای یک حرف بزرگ باشد',
      'password.minOfNumeric': 'پسورد باید حداقل شامل یک عدد باشد',
      'password.noWhiteSpaces': 'پسورد نباید دارای فضای خالی باشد',
      'password.onlyLatinCharacters':
        'پسورد فقط باید شامل کاراکتر انگلیسی باشد',
    }),

  phonenumber: Joi.string()
    .regex(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/)
    .required()
    .messages({
      'string.pattern.base': 'در فرمت شماره موبایل ایران نیست',
      'any.required': 'شماره همراه باید وارد شود',
    }),
  cafename: Joi.string().required().messages({
    'any.required': 'نام کافه باید وارد شود',
  }),
  cafephonenumber: Joi.string()
    .regex(/^0[0-9]{2,}[0-9]{7,}$/)
    .required()
    .messages({
      'string.pattern.base': 'در فرمت شماره ثابت ایران نیست',
      'any.required': 'شماره تلفن ثابت الزامی است',
    }),
  address: Joi.string().required().messages({
    'any.required': 'آدرس الزامی است',
  }),
  location: Joi.string().required().messages({
    'any.required': 'موقعیت مکانی الزامی است',
  }),
  accountNumber: Joi.string().required().messages({
    'any.required': 'شماره حساب بانکی الزامی است',
  }),
}).options({ abortEarly: false });

module.exports = schema;
