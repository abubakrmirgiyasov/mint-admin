import {DATA_SIDEBAR_SIZE} from "@core/helpers/constants/storage.constants";
import {DataLayoutSizes} from "@core/helpers/constants/layout.constants";

/*
* Changes the document attribute '<html []></html'
* */
const changeHTMLAttribute = (name: string, value: string): void => {
  if (document.documentElement)
    document.documentElement.setAttribute(name, value);
}

/*
* Changes Sidebar size
* @param size DataLayoutSizes
* */
const changeSidebarSize = (size: string): void => {
  switch (size) {
    case 'lg':
      changeHTMLAttribute(DATA_SIDEBAR_SIZE, DataLayoutSizes[DataLayoutSizes.sm]);
      localStorage.setItem(DATA_SIDEBAR_SIZE, DataLayoutSizes[DataLayoutSizes.sm]);
      break;
    case 'sm':
      changeHTMLAttribute(DATA_SIDEBAR_SIZE, DataLayoutSizes[DataLayoutSizes.lg]);
      localStorage.setItem(DATA_SIDEBAR_SIZE, DataLayoutSizes[DataLayoutSizes.lg])
      break;
    default:
      changeHTMLAttribute(DATA_SIDEBAR_SIZE, DataLayoutSizes[DataLayoutSizes.lg]);
      localStorage.setItem(DATA_SIDEBAR_SIZE, DataLayoutSizes[DataLayoutSizes.lg])
      break;
  }
}

export { changeHTMLAttribute, changeSidebarSize };
