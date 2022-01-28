const { Schema, model } = require('mongoose');
const { reactionSchema } = require('./Reaction')

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Reaction'
      }
  ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);



const Course = model('thoughts', thoughtSchema);

module.exports = Course;
