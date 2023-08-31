import Goods from "@/models/goods";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const mockRes = {"total":4,"data":[{"_id":"64e588897b7a2f0d0898fdb7","name":"1","count":1,"price":"2","image":"","type":"1","__v":0},{"_id":"64e596987b7a2f0d0898fdbb","name":"car","count":2,"price":"20.5","image":"","type":"1","__v":0},{"_id":"64e5a7b9749536d719ab8422","name":"t-shirt","count":2,"price":"15","image":"","type":"2","__v":0},{"_id":"64e5a8fa749536d719ab842c","name":"3","count":1,"price":"10","image":"","type":"1","__v":0}]}
  return new Response(JSON.stringify(mockRes), { status: 200 })
  try {
    await connectToDB();
    const req = await request.json();
    console.log(req)
    const { name, type, pageNo = 1, pageSize = 5} = req;
    let goods;
    const skipAmount = (pageNo - 1) * pageSize;
    const totalCount = await Goods.countDocuments();
    if (name) {
      goods = await Goods.find({name: {$regex: name, $option: "i"}}).skip(skipAmount).limit(pageSize).exec();
    } else if (type) {
      goods = await Goods.find({}).skip(skipAmount).limit(pageSize).exec();
    } else {
      goods = await Goods.find().skip(skipAmount).limit(pageSize).exec();
    }
    const res = {
        total: totalCount,
        data: goods
    }
    return new Response(JSON.stringify(res), { status: 200 })
  } catch (error) {
    return new Response("Server Error", { status: 500 })
  }
};

export const PATCH = async (request) => {
  const { id, name, type, price, count } = await request.json();

  try {
      await connectToDB();

      // Find the existing prompt by ID
      const existingGood = await Goods.findById(id);

      if (!existingGood) {
          return new Response("Good not found", { status: 404 });
      }

      // Update the prompt with new data
      existingGood.name = name;
      existingGood.type = type;
      existingGood.price = price;
      existingGood.count = count;

      await existingGood.save();

      return new Response("Successfully updated the Goods", { status: 200 });
  } catch (error) {
      return new Response("Error Updating Goods", { status: 500 });
  }
};

export const DELETE = async (request) => {
  const {searchParams} = new URL(request.url)
  const id = searchParams.get('id')
  try {
      await connectToDB();

      // Find the prompt by ID and remove it
      await Goods.findByIdAndRemove(id);

      return new Response("Good deleted successfully", { status: 200 });
  } catch (error) {
      return new Response("Error deleting Good", { status: 500 });
  }
};