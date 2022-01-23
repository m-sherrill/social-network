const { Schema, model } = require('mongoose')
const require('mongoose-type-email')
const thoughtSchema = require('./Thought')

// Schema to create Student model
const userSchema = new Schema(
  {
    // username string type, rquired, trimmed
    username: {
      type: String,
      required: true,
      max_length: 50,
      trim: true,
    },
    // email -- using Mongoose Type Email NPM for validation
    email: {
      type: mongoose.SchemaTypes.Email,
      required: true,
      max_length: 50,
      trim: true,
    },
    // array of thoughts by this user referencing the thoughts schema
    thoughts: [thoughtSchema],
    // array of friends or this user 
    friends: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// generating the friendCount virtual calculating the number of friends. 
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
})

const User = model('user', userSchema)

module.exports = User;
