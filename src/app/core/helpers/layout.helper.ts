import {DATA_SIDEBAR_SIZE} from "@core/helpers/constants/storage.constants";
import {DataLayoutSizes, VERTICAL_SIDEBAR_ENABLE} from "@core/helpers/constants/layout.constants";

/*
* Changes the document attribute '<html []></html'
* */
const changeHTMLAttribute = (name: string, value: string): void => {
  if (document.documentElement)
    document.documentElement.setAttribute(name, value);
}

const setDataSidebarSize = (dataLayoutSize: string): void => {
  if (isClientMobile()) {
    localStorage.setItem(DATA_SIDEBAR_SIZE, DataLayoutSizes[DataLayoutSizes.lg]);
    changeHTMLAttribute(DATA_SIDEBAR_SIZE, DataLayoutSizes[DataLayoutSizes.lg]);
  } else {
    localStorage.setItem(DATA_SIDEBAR_SIZE, dataLayoutSize);
    changeHTMLAttribute(DATA_SIDEBAR_SIZE, dataLayoutSize);
  }
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

/*
* Checks is client window size mobile (<= 767)
* */
const isClientMobile = (): boolean => {
  return document.documentElement.clientWidth <= 767;
}

/*
* Toggle to body class vertical-sidebar-enable
* */
const setMobileMenuOverlay = (): void => {
  document.body.classList.toggle(VERTICAL_SIDEBAR_ENABLE);
}

export { isClientMobile, setMobileMenuOverlay, setDataSidebarSize, changeHTMLAttribute, changeSidebarSize };
