export class PersonalDataDto {
  ide: number;
  name: string;
  position?: string; 
  area?: string;
  birthDate?: string;
  birthPlace: string;
  birthState: string;
  curp?: string;
  rfc?: string;
  militaryCard?: string;
  issstep?: string;
  gender?: string;
  maritalStatus?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  institucionalMail?: string;
  address?: string;
  addressNumber?: string;
  colony?: string;
  population?: string;
  postalCode?: string;
  photo?: string;
  degree?: string;
  title?: string;
  titleComplete?: string;
  active?: boolean = true;
}