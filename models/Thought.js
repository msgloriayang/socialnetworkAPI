const { Schema, model } = require('mongoose');

// define reaction schema below, but don't make a model
// as you're doing with user and thought; just make the schema
// and pass it into your thoughtSchema.reactions field
const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      max: [280, "Reaction body too long"]
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // don't forget to set a getter method to format the timestamp on query
      // get: (timestamp) => { do something inside this function}
    },
  })

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: [1, "Your thought is too short."],
      max: [280, "Your thougth is too long"]
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // don't forget to set a getter method to format the timestamp on query
      // get: (timestamp) => { do something inside this function}
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought
