import { Schema, model, models } from 'mongoose'

const GoodsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
  },
  count: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: [true, 'Price is required!'],
  },
  image: {
    type: String,
  },
  type: {
    type: String,
  },
})

const Goods = models.Goods || model('Goods', GoodsSchema)

export default Goods
