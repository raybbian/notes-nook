import {lazy} from "react";

export default function Class({courseID, name, professor, description, year, semester, color, active}) {
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

    return (
        <div className={"border-2 border-black"}>
            <div
                className={`p-4 ${color} bg-no-repeat bg-center bg-cover`}
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/class-backgrounds/${courseID}.svg)`
                }}
            >
                <p className={"text-sm opacity-70 font-bold"}>{getFormattedSchoolYear(year)} • {`S${semester}`} • {getFormattedDateYear(year)} • {courseID.toUpperCase()} • {getLastName(professor)}</p>
                <p className={"text-xl font-bold"}>{name}</p>
            </div>
            <div
                className={`px-4 pb-4 pt-2 text-left ${active && "hover:cursor-pointer"}`}
                onClick={() => {
                    if (!active) return;
                    window.open(`https://raw.githubusercontent.com/raybbian/notes-nook/notes/notes/${courseID}/${courseID}.pdf`, "_blank")
                }}
            >
                <p className={`text-lg font-bold`}>
                    {active ?
                        <span>Lecture Notes</span> :
                        <span>Unavailable</span>
                    }
                </p>
                <p className={"text-sm opacity-80"}>{description}</p>
            </div>
        </div>
    )
}