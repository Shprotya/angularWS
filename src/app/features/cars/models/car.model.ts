export interface CarModel {
    _id?: string;
    make: string;
    model: string;
    year?: number;
}

export interface CreateCarDto {
    make: string;
    model: string;
    year?: number;
}

// Same as CreateCarDto for now: the form sends every field and PUT replaces the whole car
export interface UpdateCarDto {
    make: string;
    model: string;
    year?: number;
}