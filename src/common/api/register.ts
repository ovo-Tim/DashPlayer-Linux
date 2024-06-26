import {ipcMain} from "electron";
import {ApiMap} from "@/common/api/api-def";
import SystemService from '@/backend/services/SystemService';


export default function registerRoute<K extends keyof ApiMap>(path: K, func: ApiMap[K]) {
    ipcMain.handle(path, (_event, param) => {
        console.log('api-call', path, JSON.stringify(param));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return func(param).catch((e: Error) => {
            SystemService.sendErrorToRenderer(e)
            throw e
        });
    });
}
