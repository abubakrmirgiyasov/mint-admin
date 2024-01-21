interface Badge {
  variant: string;
  text: string;
}

export interface MenuItem {
  id: number;
  label: string;
  isTitle?: boolean;
  icon?: string;
  link?: string;
  subItems?: MenuItem[];
  parentId?: number;
  isLayout?: boolean;
  badge?: Badge;
}




