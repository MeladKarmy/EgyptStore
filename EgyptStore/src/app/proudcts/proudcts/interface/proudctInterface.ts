export interface IProudct {
    proudctId: number
    title: string
    slug: string
    price: number
    discountPercentage: number
    description: string
    category: string
    subCategory: string
    brand: string
    image: string
    ImageCover: string
    stock: number
    solid: number
    rating: number
    usersRating: number
    fav: boolean
    statusStock: boolean
    comments: [
        {
            proudctId: number
            userId: string
            text: string
        }

    ]

}