const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const moment = require('moment');

const ReactionSchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      max: 280,
      required: true
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: moment(),
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: 1,
      max: 280
    },
    createdAt: {
      type: Date,
      default: moment(),
      get: createdAtVal => dateFormat(createdAtVal)
    },
    username:{
      type: String,
      required: true
    },
    // use ReactionSchema to validate data for a reply
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;