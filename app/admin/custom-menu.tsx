import { Menu } from "react-admin"

export const CustomMenu = () => {
    return (
        <Menu
        className="flex flex-col gap-3 px-3 bg-rose-500"
        >
            <Menu.ResourceItem name="courses" />
            <Menu.ResourceItem name="units" />
            <Menu.ResourceItem name="lessons" />
        </Menu>
    )
}