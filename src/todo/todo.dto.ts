import {  IsString, IsBoolean, IsNumber, IsNotEmpty, IsDate, IsDateString } from 'class-validator';

export class TodoDto {
    @IsNotEmpty() // Ensures the title is not empty
    @IsString()
    name: string; 

    @IsNotEmpty() // Ensures the description is not empty
    @IsString()
    goal: string;

    @IsBoolean()
    autoSync: boolean; 

    @IsNotEmpty() // Ensures priority is defined
    @IsDateString()
    nextSync: string; // Keep it as a string for initial parsing
}
