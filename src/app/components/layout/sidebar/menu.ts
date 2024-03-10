import {MenuItem} from "@core/models/menu.item";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true,
  },
  {
    id: 2,
    label: 'MENUITEMS.DASHBOARD.TEXT',
    icon: 'tuiIconTrendingUp',
    subItems: [
      {
        id: 3,
        label: 'MENUITEMS.DASHBOARD.LIST.ANALYTICS',
        link: '/analytics',
        parentId: 2,
      },
      {
        id: 4,
        label: 'MENUITEMS.DASHBOARD.LIST.CRM',
        link: '/crm',
        parentId: 2
      }
    ]
  },
  {
    id: 14,
    label: 'MENUITEMS.ADMINISTRATING.TEXT',
    isTitle: true,
  },
  {
    id: 5,
    label: 'MENUITEMS.CATALOG.TEXT',
    icon: 'tuiIconPaperclip',
    subItems: [
      {
        id: 6,
        label: 'MENUITEMS.CATALOG.LIST.CATEGORIES',
        link: '/catalog/categories',
        parentId: 5
      },
      {
        id: 7,
        label: 'MENUITEMS.CATALOG.LIST.SUB_CATEGORIES',
        link: '/catalog/sub-categories',
        parentId: 5
      },
      {
        id: 8,
        label: 'MENUITEMS.CATALOG.LIST.MANUFACTURES',
        link: '/catalog/manufactures',
        parentId: 5
      },
      {
        id: 9,
        label: 'MENUITEMS.CATALOG.LIST.EMAIL',
        parentId: 5,
        subItems: [
          {
            id: 10,
            label: 'MENUITEMS.CATALOG.LIST.MAILBOX',
            link: '/mailbox',
            parentId: 9
          },
          {
            id: 11,
            label: 'MENUITEMS.CATALOG.LIST.MAILTEMPLATES',
            parentId: 9,
            subItems: [
              {
                id: 12,
                label: 'MENUITEMS.CATALOG.LIST.BASICACTION',
                link: '/email-basic',
                parentId: 11
              },
              {
                id: 13,
                label: 'MENUITEMS.CATALOG.LIST.ECOMMERCEACTION',
                link: '/email-ecommerce',
                parentId: 11
              },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 14,
    label: "TEST",
    link: '/',
    icon: 'tuiIconDroplet',
  }
  // id: 15
];
