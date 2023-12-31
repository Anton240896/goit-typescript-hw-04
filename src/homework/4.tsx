import React, {
  createContext,
  useMemo,
  useState,
  useContext,
  ReactNode,
} from "react";
import noop from "lodash/noop";

type MenuIds = "first" | "second" | "last";
type Menu = { id: MenuIds; title: string };

//  Decision HW 4 tsx
type SelectedMenu = Pick<Menu, "id">; // Описати тип SelectedMenu:
// Це має бути об'єкт, який містить id з типом MenuIds

type MenuSelected = {
  selectedMenu: SelectedMenu; // Описати тип MenuSelected:
  // Цей тип є об'єктом, що містить selectedMenu
};

type MenuAction = {
  onSelectedMenu: (obj: SelectedMenu) => void; // Описати тип MenuAction:
  // Цей тип являє собою об'єкт з методом onSelectedMenu,
  // який приймає об'єкт типу SelectedMenu як аргумент повертає void.
};

// Додаємо тип Menu Selected

const MenuSelectedContext = createContext<MenuSelected>({
  selectedMenu: { id: "first" },
});

// Додаємо тип MenuAction

const MenuActionContext = createContext<MenuAction>({
  onSelectedMenu: noop,
});

type PropsProvider = {
  children: ReactNode; // Описуємо тип PropsProvider:
  // Описуємо правильний тип для дітей
};

function MenuProvider({ children }: PropsProvider) {
  // Додаємо тип для SelectedMenu він повинен містити { id }
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>({
    id: "first",
  });

  const menuContextAction = useMemo(
    () => ({
      onSelectedMenu: setSelectedMenu,
    }),
    []
  );

  const menuContextSelected = useMemo(
    () => ({
      selectedMenu,
    }),
    [selectedMenu]
  );

  return (
    <MenuActionContext.Provider value={menuContextAction}>
      <MenuSelectedContext.Provider value={menuContextSelected}>
        {children}
      </MenuSelectedContext.Provider>
    </MenuActionContext.Provider>
  );
}

type PropsMenu = {
  menus: Menu[]; // Описати тип PropsMenu:
  //  Описуємо тип для menus, він має бути від типу Menu
};

function MenuComponent({ menus }: PropsMenu) {
  const { onSelectedMenu } = useContext(MenuActionContext);
  const { selectedMenu } = useContext(MenuSelectedContext);

  return (
    <>
      {menus.map((menu) => (
        <div key={menu.id} onClick={() => onSelectedMenu({ id: menu.id })}>
          {menu.title}{" "}
          {selectedMenu.id === menu.id ? "Selected" : "Not selected"}
        </div>
      ))}
    </>
  );
}

export function ComponentApp() {
  const menus: Menu[] = [
    {
      id: "first",
      title: "first",
    },
    {
      id: "second",
      title: "second",
    },
    {
      id: "last",
      title: "last",
    },
  ];

  return (
    <MenuProvider>
      <MenuComponent menus={menus} />
    </MenuProvider>
  );
}
