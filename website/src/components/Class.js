import {useEffect, useState} from "react";

export default function Class({courseID, name, professor, description, year, semester, status, notes, active}) {
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

    const statusColors = {
        "incomplete": "bg-koi-red",
        "complete": 'bg-light-green',
        "inprogress": "bg-teal"
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
                className={`px-4 pb-4 pt-2 text-left hover:cursor-pointer hover:bg-[rgb(245,245,245)] transition-colors duration-200 ease-in-out`}
                onClick={() => {
                    window.open(`https://raw.githubusercontent.com/raybbian/notes-nook/notes/notes/bachelor-${year}/semester-${semester}/${courseID}/master.pdf`, "_blank")
                }}
            >
                <p className={`text-lg font-bold`}>
                    <p className={"truncate"}>Lecture Notes</p>
                </p>
                <p className={"text-sm opacity-80 line-clamp-5"}>{description}</p>
                <div className={"flex flex-row gap-2 items-center group pt-2 text-sm font-bold"}>
                    <p className={"opacity-70"}>Status:</p>
                    <div className={`aspect-square rounded-full w-3 h-3 ${statusColors[status]}`}></div>
                    <p className={"opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-70"}>{notes && notes}</p>
                </div>
            </div>
        </div>
    )
}