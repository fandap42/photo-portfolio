import { type SchemaTypeDefinition } from 'sanity'
import {categoryType} from './categoryType'
import {photoType} from './photoType'
import {subcategoryType} from './subcategoryType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, subcategoryType, photoType],
}
