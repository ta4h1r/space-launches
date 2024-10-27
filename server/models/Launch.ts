import mongoose, { Schema } from "mongoose";

interface ILaunch extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
}

const schema = new Schema<ILaunch>({
  id: {
    type: Schema.Types.String,
  },
  name: {
    type: Schema.Types.String,
  },
  email: {
    type: Schema.Types.String,
  },
  password: {
    type: Schema.Types.String,
  },
});

export default mongoose.models.User || mongoose.model<ILaunch>("User", schema);
