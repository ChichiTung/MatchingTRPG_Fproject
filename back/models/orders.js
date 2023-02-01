import { Schema, model, ObjectId } from 'mongoose'


const schema = new Schema({
  pl_id: {
    type: [ObjectId],
    ref: 'users',
    required: [true, '缺少PL']
  },
  module_id: {
    type: ObjectId,
    ref: 'modules',
    required: [true, '報名的模組不見了..bug']
  },
  lackPl: {
    type: Number,
    required: [true, '缺少多少PL，沒有記錄喔']
  },
  date: {
    type: Date,
    default: Date.now
  },
  public: Boolean

}, { versionKey: false })

export default model('orders', schema)
