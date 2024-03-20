"use client"
import { Admin, Layout, Resource } from "react-admin"
import simpleRestProvider from "ra-data-simple-rest"
import CourseList from "./course/list"
import CourseCreate from "./course/create"
import CourseEdit from "./course/edit"
import UnitList from "./unit/list"
import UnitCreate from "./unit/create"
import { BookCheck, Group, ListCollapse, School } from "lucide-react"
import { queryClient } from "./query-client"
import { themes } from "./themes"
import UnitEdit from "./unit/edit"
import LessonList from "./lesson/list"
import LessonCreate from "./lesson/create"
import LessonEdit from "./lesson/edit"
import { CustomMenu } from "./custom-menu"

const dataProvider = simpleRestProvider("/api")
// const CustomLayout = () => <Layout menu={CustomMenu} />


const App = () => {
    return (
        <Admin
            dataProvider={dataProvider}
            queryClient={queryClient}
            {...themes}
        >

            <Resource
                name="courses"
                list={CourseList}
                create={CourseCreate}
                edit={CourseEdit}
                recordRepresentation={"title"}
                icon={School}
            />
            <Resource
                name="units"
                list={UnitList}
                create={UnitCreate}
                edit={UnitEdit}
                recordRepresentation={"title"}
                icon={ListCollapse}
                options={{ label: "📗 Units" }}
            />
            <Resource
                name="lessons"
                list={LessonList}
                create={LessonCreate}
                edit={LessonEdit}
                recordRepresentation={"title"}
                icon={BookCheck}
                options={{ label: "📑 Lessons" }}
            />
        </Admin>
    )
}
export default App