import Goods from "@/models/goods";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  try {
    await connectToDB();
    const req = await request.json();
    console.log(req)
    const { name, type, price = '0', count = 1, image=''} = req;
    const newGood = new Goods({name, type, price, count, image})
    await newGood.save();
    return new Response(JSON.stringify(newGood), { status: 200 })
  } catch (error) {
    return new Response("Server Error", { status: 500 })
  }
};
