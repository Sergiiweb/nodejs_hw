import joi from "joi";

import { regexConstants } from "../constants/regex.constants";
import { EGenders } from "../enums/gender.enum";

export class UserValidator {
  static firstName = joi.string().min(1).max(50).trim();
  static age = joi.number().min(0).max(199);
  static genders = joi.valid(...Object.values(EGenders));
  static email = joi.string().regex(regexConstants.EMAIL).trim();
  static password = joi.string().regex(regexConstants.PASSWORD).trim();

  // static create = joi.object({
  //   name: this.firstName.required(),
  //   age: this.age.required(),
  //   genders: this.genders.required(),
  //   email: this.email.required(),
  //   password: this.password.required(),
  // });

  static update = joi.object({
    name: this.firstName,
    age: this.age,
    genders: this.genders,
  });

  static register = joi.object({
    name: this.firstName,
    age: this.age,
    genders: this.genders,
    email: this.email.required(),
    password: this.password.required(),
  });

  static login = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
