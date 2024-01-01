import ClassGroup from "./components/ClassGroup";
import {useEffect, useState} from "react";

export default function App() {
    const [lastUpdated, setLastUpdated] = useState("...")

    function timeAgo(date) {
        const now = new Date();
        const givenDate = new Date(date);
        const diffInMs = now - givenDate;

        // Convert milliseconds to minutes, days, months, and years
        const minutesAgo = Math.floor(diffInMs / (1000 * 60));
        const hoursAgo = Math.floor(diffInMs / (1000 * 60 * 60));
        const daysAgo = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const weeksAgo = Math.floor(daysAgo / 7);
        const monthsAgo = Math.floor(daysAgo / 30);
        const yearsAgo = Math.floor(monthsAgo / 12);

        // console.log(minutesAgo, daysAgo, weeksAgo, monthsAgo, yearsAgo)

        if (minutesAgo === 0) {
            return "Now"
        } else if (hoursAgo === 0) {
            return `${minutesAgo}m ago`
        } else if (daysAgo === 0) {
            return `${hoursAgo}h ago`
        } else if (weeksAgo === 0) {
            return `${daysAgo}d ago`
        } else if (monthsAgo === 0) {
            return `${weeksAgo}w ago`
        } else if (yearsAgo === 0) {
            return `${monthsAgo}mo ago`
        } else {
            return `${yearsAgo}y ago`
        }

    }

    function getLastUpdated() {
        const sourceCodeUrl = `https://raw.githubusercontent.com/raybbian/notes-nook/notes/notes/timestamp.txt`;
        fetch(sourceCodeUrl).then(res => res.text()).then(res => {
            //takes first line and formats as ISO date string
            const dateISOString = res.replace(' ', 'T') + 'Z'
            const dateObj = new Date(dateISOString)

            console.log(dateISOString)

            setLastUpdated(timeAgo(dateObj))
        }).catch(() => {

        })
    }

    useEffect(() => {
        getLastUpdated()
    }, []);

    return (
        <div className="App w-[100dvw] h-auto min-h-[100dvh] flex justify-center bg-sage-green">
            <div className={"flex flex-col w-full max-w-[1152px] p-12 bg-cream mobile:p-8 border-x-2 border-black gap-4"}>
                <div className={"flex flex-col gap-2"}>
                    <p className={"text-4xl font-bold"}>Notes Nook</p>
                    <div className={"flex flex-row gap-4 justify-between"}>
                        <p className={"text-base line-clamp-2"}>A collection of the notes I've taken at Georgia Tech.</p>
                        <p className={"line-clamp-2 text-end"}>Updated {lastUpdated}.</p>
                    </div>
                </div>
                <ClassGroup title={"Current Courses"} type={"current"} color={"bg-sage-green"}/>
                <ClassGroup title={"Past Courses"} type={"past"} color={"bg-sage-green"}/>
            </div>
        </div>
    );
}
