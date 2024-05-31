import mongoose, { Schema, models } from 'mongoose'

const listSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Owner: {
    type: String,
    required: true,
  },
  private: {
    type: Boolean,
    required: false,
  },
  movies: {
    type: Object,
    required: false,
  },
})

const List = models.List || mongoose.model('List', listSchema)
export default List
