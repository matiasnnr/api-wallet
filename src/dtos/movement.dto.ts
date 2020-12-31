import { MovementType } from "../common/enums/movement-type";

interface MovementCreateDTO {
    type: MovementType;
    user_id: number;
    amount: number;
}

export {
    MovementCreateDTO
}