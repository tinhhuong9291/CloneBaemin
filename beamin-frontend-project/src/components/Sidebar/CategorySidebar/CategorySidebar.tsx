'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Dữ liệu menu
interface MenuItem {
  menu_id: number;
  name: string;
  parent_id: number | null;
  children?: MenuItem[];
}

// Hàm chuyển đổi menu sang dạng cây hai cấp
const buildMenuTree = (menuList: MenuItem[]): MenuItem[] => {
  const menuMap: { [key: number]: MenuItem } = {};
  const rootMenus: MenuItem[] = [];

  menuList.forEach((menu) => {
    menuMap[menu.menu_id] = { ...menu, children: [] };
  });

  menuList.forEach((menu) => {
    if (menu.parent_id === null) {
      rootMenus.push(menuMap[menu.menu_id]);
    } else if (menuMap[menu.parent_id]) {
      menuMap[menu.parent_id].children?.push(menuMap[menu.menu_id]);
    }
  });

  return rootMenus;
};

// Component Accordion hiển thị menu
export default function CategorySidebar({
  menuList,
}: {
  menuList: MenuItem[];
}) {
  const [menuTree, setMenuTree] = useState<MenuItem[]>([]);

  useEffect(() => {
    setMenuTree(buildMenuTree(menuList));
  }, [menuList]);

  return (
    <Accordion type="single" collapsible className="w-full">
      <h3 className="mb-4 border-b-2 border-primary pb-3">Categories</h3>
      {menuTree.map((menu) => (
        <AccordionItem
          key={menu.menu_id}
          value={`item-${menu.menu_id}`}
          className="border-b"
        >
          <AccordionTrigger className="text-[15px] font-bold duration-300 hover:text-primary hover:no-underline">
            {menu.name}
          </AccordionTrigger>
          {menu.children && menu.children.length > 0 && (
            <AccordionContent>
              <ul className="list-none pl-4">
                {menu.children.map((child) => (
                  <li key={child.menu_id}>
                    <Link
                      href={`/categories/${child.menu_id}`}
                      className="block py-1 text-[14px] font-semibold hover:text-primary"
                    >
                      <ChevronRight
                        size={16}
                        strokeWidth={2.5}
                        className="mr-1.5 inline-block text-secondary"
                      />
                      {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
