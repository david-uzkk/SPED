// Schools.js
import { getSchools } from "../services/apis";

let schools = [];

export const fetchSchools = async () => {
    try {
        schools = await getSchools();
    } catch (error) {
        console.error("Erro ao buscar as escolas:", error);
    }
};

export const getSchoolList = () => {
    return schools;
};