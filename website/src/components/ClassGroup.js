import courses from "../definitions/courses";
import Class from "./Class";

export default function ClassGroup({title, type, color}) {
    return (
        <>
            <p className={"text-2xl font-bold"}>{title}</p>
            <div className={"grid gap-4 grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1"}>
                {Object.keys(courses[type]).map((courseID, idx) => (
                    <Class
                        key={idx}
                        courseID={courseID}
                        name={courses[type][courseID]["name"]}
                        professor={courses[type][courseID]["professor"]}
                        description={courses[type][courseID]["description"]}
                        year={courses[type][courseID]["year"]}
                        semester={courses[type][courseID]["semester"]}
                        status={courses[type][courseID]["status"]}
                        notes={courses[type][courseID]["notes"]}
                        active={type !== "future"}
                    />
                ))}
            </div>
        </>
    )
}