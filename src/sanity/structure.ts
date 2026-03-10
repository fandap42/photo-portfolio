import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('category').title('Categories'),
      S.divider(),
      S.documentTypeListItem('subcategory').title('Legacy subcategories'),
      S.documentTypeListItem('photo').title('Legacy photos'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['category', 'subcategory', 'photo'].includes(item.getId() as string)
      ),
    ])
