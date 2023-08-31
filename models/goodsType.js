import { Schema, model, models} from 'mongoose';

const GoodsTypeSchema = new Schema({
    typeEName: {
        type: String,
        required: [true, 'TypeName is required!']
    },
    typeCName: {
        type: String,
        required: [true, 'TypeName is required!']
    },
})

const GoodsType = models.GoodsType || model("GoodsType", GoodsTypeSchema);

export default GoodsType;