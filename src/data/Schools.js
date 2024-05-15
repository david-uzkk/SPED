// Schools.js
import { getSchools } from "../services/apis";

let schools = [];

export const fetchSchools = async () => {
    try {
        schools = await getSchools();
        schools.forEach(school => {
            console.log(`Longitude: ${school.location.longitude}, Latitude: ${school.location.latitude}`);
          });
    } catch (error) {
        console.error("Erro ao buscar as escolas:", error);
    }
};

export const getSchoolList = () => {
    return schools;
};