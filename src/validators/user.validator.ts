import joi from "joi";

import { regexConstants } from "../constants/regex.constants";
import { EGenders } from "../enums/gender.enum";

export class UserValidator {
  static firstName = joi.string().min(1).max(50).trim();
  static age = joi.number().min(0).max(199);
  static genders = joi.valid(...Object.values(EGenders));

  static create = joi.object({
    name: this.firstName.required(),
    age: this.age.required(),
    genders: this.genders.required(),
    email: joi.string().regex(regexConstants.EMAIL).trim().required(),
    password: joi.string().regex(regexConstants.PASSWORD).trim().required(),
  });

  static update = joi.object({
    name: this.firstName.trim(),
    age: this.age,
    genders: this.genders,
  });
}
