const { Schema, model, SchemaTypes } = require('mongoose')
const Email = require('mongoose-type-email')
const { Thought } = require('./Thought')


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
      type: SchemaTypes.Email,
      required: true,
      max_length: 50,
      trim: true,
    },
    // array of thoughts by this user referencing the thoughts schema
    thoughts: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
      }
  ],
    // array of friends for this user 
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// generating the friendCount virtual calculating the number of friends. 
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
})

const User = model('user', userSchema)

module.exports = User;
