import { type SchemaTypeDefinition } from 'sanity'
import {categoryType} from './categoryType'
import {photoType} from './photoType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, photoType],
}
