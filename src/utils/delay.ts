/**
* Promisifies setTimeout so I can await it
*/
export const d = async (time: number) => new Promise(r => setTimeout(r, time));
