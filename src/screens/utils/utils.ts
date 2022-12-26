import {useEffect, useState} from "react";




export const useArray = <T>(params: T[]) => {

    const [persons, setPersons] = useState(params);

    return {
        value: persons,
        clear: () => {
            setPersons([]);
        },
        removeIndex: (indexNum: number) => {
            const newPersons = [...persons];
            newPersons.splice(indexNum, 1);
            setPersons(newPersons);
        },
        add: (person: T) => {
            const newPersons = [...persons, person];
            setPersons(newPersons);
        }
    };

}