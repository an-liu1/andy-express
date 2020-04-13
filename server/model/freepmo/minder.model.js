import mongoose from "mongoose";

const Schema = mongoose.Schema;

const minderSchema = new Schema({
  goal: {
    data: {
      text: String,
      id: String
    },
    children: [
      {
        data: {},
        children: Array
      }
    ]
  },
  stakehold: {
    data: {
      text: String,
      id: String
    },
    children: [
      {
        data: {},
        children: Array
      }
    ]
  },
  task: {
    data: {
      text: String,
      id: String
    },
    children: [
      {
        data: {},
        children: Array
      }
    ]
  },
  plan: {
    tasks: {
      data: [
        {
          id: String,
          text: String,
          start_date: Date,
          end_date: Date,
          duration: Number,
          progress: String,
          parent: String
        }
      ],
      links: Array
      // [
      //   {
      //     id: Number,
      //     source: String,
      //     target: String,
      //     type: String
      //   }
      // ]
    },
    messages: []
  },
  userId: {
    type: String,
    trim: true
  },
  projectName: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    trim: true
  }
});

const Minder = mongoose.model("Minder", minderSchema);

export default Minder;
