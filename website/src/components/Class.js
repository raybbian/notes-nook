import {useEffect, useState} from "react";

export default function Class({courseID, name, professor, description, year, semester, status, notes, active}) {
    const [lastUpdated, setLastUpdated] = useState("...")
    function getFormattedSchoolYear(yearNum) {
        if (yearNum <= 3) {
            return `B${yearNum}`
        } else {
            return `M${yearNum - 3}`
        }
    }

    function getFormattedDateYear(yearNum) {
        return `${23 + yearNum - 1}-${23 + yearNum}`
    }

    function getLastName(professorName) {
        if (professorName === "Not Assigned") {
            return professorName
        }
        return professorName.split(' ')[1]
    }

    function getLastUpdated() {
        if (!active) return;
        const sourceCodeUrl = `https://raw.githubusercontent.com/raybbian/notes-nook/notes/notes/${courseID}/${courseID}.tex`;
        fetch(sourceCodeUrl).then(res => res.text()).then(res => {
            //takes first line and formats as ISO date string
            const dateISOString = res.split('\n')[0].substring(10, 30).replace(' ', 'T') + 'Z'
            const dateObj = new Date(dateISOString)

            // console.log(dateISOString)

            setLastUpdated(timeAgo(dateObj))
        }).catch(() => {

        })
    }

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

    useEffect(() => {
        getLastUpdated()
        timeAgo(new Date())
    }, []);

    const statusColors = {
        "missing": "bg-koi-red",
        "incomplete": 'bg-[#699385]',
        "complete": 'bg-light-green',
    }

    return (
        <div className={"border-2 border-black"}>
            <div
                className={`p-4 bg-no-repeat bg-center bg-cover`}
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/class-backgrounds/${courseID}.svg)`
                }}
            >
                <p className={"text-sm opacity-70 font-bold truncate"}>{getFormattedSchoolYear(year)} • {`S${semester}`} • {getFormattedDateYear(year)} • {courseID.toUpperCase()} • {getLastName(professor)}</p>
                <p className={"text-xl font-bold truncate"}>{name}</p>
            </div>
            <div
                className={`px-4 pb-4 pt-2 text-left ${active && "hover:cursor-pointer hover:bg-[rgb(245,245,245)]"}`}
                onClick={() => {
                    if (!active) return;
                    window.open(`https://raw.githubusercontent.com/raybbian/notes-nook/notes/notes/${courseID}/${courseID}.pdf`, "_blank")
                }}
            >
                <p className={`text-lg font-bold`}>
                    {active ?
                        <div className={"flex flex-row justify-between items-center gap-2"}>
                            <p className={"truncate"}>Lecture Notes</p>
                            <p className={"text-sm opacity-70 truncate"}>Updated: {lastUpdated}</p>
                        </div> :
                        <span>Unavailable</span>
                    }
                </p>
                <p className={"text-sm opacity-80 line-clamp-5"}>{description}</p>
                {active &&
                    <div className={"flex flex-row gap-2 items-center group pt-2 text-sm font-bold"}>
                        <p className={"opacity-70"}>Status:</p>
                        <div className={`aspect-square rounded-full w-3 h-3 ${statusColors[status]}`}></div>
                        <p className={"opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-70"}>{notes && notes}</p>
                    </div>
                }
            </div>
        </div>
    )
}