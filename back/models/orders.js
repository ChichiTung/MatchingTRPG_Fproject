import { Schema, model, ObjectId } from 'mongoose'

const orderSchema = new Schema({
  m_id: {
    type: ObjectId,
    ref: 'products',
    required: [true, '缺少商品']
  },
  gm_id: {
    type: ObjectId,
    ref: 'users',
    required: [true, '缺少 GM']
  }
})

const schema = new Schema({
  pl_id: {
    type: [ObjectId],
    ref: 'users',
    required: [true, '缺少PL']
  },
  module: {
    type: [orderSchema],
    default: []
  },

  lack_Pl: {
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
