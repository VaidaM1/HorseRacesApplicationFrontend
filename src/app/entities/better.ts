import { Horse } from './horse';

export interface Better {
    id: number,
    name: string,
    surname: string,
    bet: number,
    horseId: number,
    horse?: Horse,
};