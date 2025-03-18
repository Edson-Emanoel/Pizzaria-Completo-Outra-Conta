import prismaClient from "../../prisma";

interface OrderRequest{
    item_id: string;
}

class RemoveItemService{
    async execute({item_id}: OrderRequest){

        const order = await prismaClient.item.delete({
            where:{
                id: item_id,
            }
        })

        return order

    }
}

export { RemoveItemService }