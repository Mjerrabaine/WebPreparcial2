import {IsNotEmpty, IsString, IsUrl} from 'class-validator';
export class PropuestaDto {

 @IsString()
 @IsNotEmpty()
 readonly titulo: string;
 
 @IsString()
 @IsNotEmpty()
 readonly descripcion: string;
 
 @IsString()
 @IsNotEmpty()
 readonly palabraClave: string;
 //@IsUrl()

}