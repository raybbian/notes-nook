import Class from "./components/Class";
import ClassGroup from "./components/ClassGroup";

export default function App() {
    return (
        <div className="App w-[100dvw] h-[100dvh] flex justify-center bg-sage-green">
            <div className={"flex flex-col w-full h-auto max-w-[1152px] px-12 mobile:px-5 bg-cream py-8 border-x-2 border-black gap-4"}>
                <div className={"flex flex-col gap-2"}>
                    <p className={"text-4xl font-bold"}>Notes Nook</p>
                    <p className={"text-base"}>A collection of the notes I've taken at Georgia Tech.</p>
                </div>
                <ClassGroup title={"Current Courses"} type={"current"} color={"bg-sage-green"}/>
                <ClassGroup title={"Future Courses"} type={"future"} color={"bg-sage-green"}/>
                {/*<ClassGroup title={"Past Courses"} type={"past"} color={"bg-sage-green"}/>*/}
            </div>
        </div>
    );
}
