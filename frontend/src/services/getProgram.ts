import { client } from "@/support/client";


interface ProgramsByDateResponse {
    id?: number;
    attributes: {
        program_date: string;
        programs: {
            data: ProgramResponse[]
        };
    };
}

interface ProgramResponse{
    id: number;
    attributes: { start_time: string; end_time?: string; name: string; };
}

export interface ProgramInterface {
    id: number;
    startTime: string;
    name: string;
}

export interface ProgramsByDateInterface {
    id: number;
    date: string;
    programs: ProgramInterface[];
}



const weekDays = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];


export async function getProgram() {
    const programsbyDate = await client.get("/api/program-dates?populate=*").then((response) => response.data);

    return programsbyDate.data
        .sort((a: ProgramsByDateResponse, b: ProgramsByDateResponse) => a.attributes.program_date.localeCompare(b.attributes.program_date))
        .map((program: ProgramsByDateResponse) => {
        const date = new Date(program.attributes.program_date);
        return {
            id: program.id,
            date: `${weekDays[date.getDay()]}, ${date.toLocaleDateString('de-DE', {day: '2-digit', month: '2-digit', year: 'numeric'})}`,
            programs: program.attributes.programs.data.map((program: ProgramResponse) => {
                return {
                    id: program.id,
                    name: program.attributes.name,
                    startTime: stripTime(program.attributes.start_time) + `${program.attributes.end_time ? ' - ' + stripTime(program.attributes.end_time) : ''}`,
                }
            }).sort((a: ProgramInterface, b: ProgramInterface) => a.startTime.localeCompare(b.startTime))
        }
    })


}


const stripTime = (time: string) => time.substring(0, time.indexOf(':', time.indexOf(':') + 1));
