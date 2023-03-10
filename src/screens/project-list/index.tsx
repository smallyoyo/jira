import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import qs from "qs";
import {cleanObject, useDebounce, useMount} from "../utils";


const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {

    const [param, setParam] = useState({
        name : '',
        personId: ''
    })
    const [list, setList] = useState([])

    const [users, setUsers] = useState([])

    const debouncedParam = useDebounce(param, 500)

    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [debouncedParam])

    useMount(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    })

    return <div>
        <SearchPanel param={param} setParam={setParam} users={users}/>
        <List list={list} users={users}/>
    </div>


}