import nodemailer from "nodemailer";

// import hbs from "nodemailer-express-handlebars";
import { configs } from "../configs/config";

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      from: "No reply",
      service: "gmail",
      auth: {
        user: configs.NO_REPLY_EMAIL,
        pass: configs.NO_REPLY_PASSWORD,
      },
    });
  }

  public async sendMail(email: string) {
    return await this.transporter.sendMail({
      to: email,
      subject: "Subject",
      html: "<div>Hello First Email</div>",
    });
  }
}

export const emailService = new EmailService();
