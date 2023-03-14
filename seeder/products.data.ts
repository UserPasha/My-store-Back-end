import { Product } from '@prisma/client'

export interface IProductPart extends Pick<Product, 'name'| 'images'>{}

export const products: IProductPart[]  =[
  {
    name: 'Salt Ice Viking Taste One',
    images:[
      'uploads/images/products/EnergyImage',
      'uploads/images/products/Tobacco'
    ]
  },
  {
    name: 'Salt Brand New Taste Two',
    images:[
      'uploads/images/products/EnergyImage',
      'uploads/images/products/Tobacco'
    ]
  },
  {
    name: 'Brand Test length symbols  yeahh tyy',
    images:[
      'uploads/images/products/EnergyImage',
      'uploads/images/products/Tobacco'
    ]
  },
  {
    name: 'Salt Brand Test Taste',
    images:[
      'uploads/images/products/EnergyImage',
      'uploads/images/products/Tobacco'
    ]
  },
  {
    name: 'Salt Brand Test New',
    images:[
      'uploads/images/products/EnergyImage',
      'uploads/images/products/Tobacco'
    ]
  }
]