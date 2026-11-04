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