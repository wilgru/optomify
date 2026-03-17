import { createServerFn } from "@tanstack/react-start";
import dbConnect from "../../lib/dbConnect";
import User from "../models/User";

export const login = createServerFn({ method: "POST" })
  .inputValidator(
    (data: { email: string; password: string }) => data,
  )
  .handler(async ({ data }) => {
    await dbConnect();

    const user = await User.findOne({ email: data.email });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isValid = await user.verifyPassword(data.password);

    if (!isValid) {
      throw new Error("Invalid email or password");
    }

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    };
  });
