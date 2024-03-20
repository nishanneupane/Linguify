"use client"
import { Admin, CustomRoutes, Layout, Resource } from "react-admin"
import simpleRestProvider from "ra-data-simple-rest"
import CourseList from "./course/list"
import CourseCreate from "./course/create"
import CourseEdit from "./course/edit"
import UnitList from "./unit/list"
import UnitCreate from "./unit/create"
import { BookCheck, Group, ListCollapse, Option, School, Swords } from "lucide-react"
import { queryClient } from "./query-client"
import { themes } from "./themes"
import UnitEdit from "./unit/edit"
import LessonList from "./lesson/list"
import LessonCreate from "./lesson/create"
import LessonEdit from "./lesson/edit"
import ChallengeList from "./challenge/list"
import ChallengeEdit from "./challenge/edit"
import ChallengeCreate from "./challenge/create"
import { CustomMenu } from "./custom-menu"
import { ChallengeOptionList } from "./challengeOption/list"
import ChallengeOptionCreate from "./challengeOption/create"
import ChallengeOptionEdit from "./challengeOption/edit"

const dataProvider = simpleRestProvider("/api")
// const CustomLayout = () => <Layout menu={CustomMenu} />


const App = () => {
    return (
        <Admin
            dataProvider={dataProvider}
            queryClient={queryClient}
            // layout={CustomLayout}
            {...themes}
        >


            <Resource
                name="courses"
                list={CourseList}
                create={CourseCreate}
                edit={CourseEdit}
                recordRepresentation={"title"}
                icon={School}
                options={{ label: "📚 Courses" }}
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
            <Resource
                name="challenges"
                list={ChallengeList}
                create={ChallengeCreate}
                edit={ChallengeEdit}
                recordRepresentation={"question"}
                icon={Swords}
                options={{ label: "🕐 Challenges" }}
            />
            <Resource
                name="challengeOptions"
                list={ChallengeOptionList}
                create={ChallengeOptionCreate}
                edit={ChallengeOptionEdit}
                recordRepresentation={"text"}
                icon={Option}
                options={{ label: "💿 Options" }}
            />
        </Admin>
    )
}
export default App