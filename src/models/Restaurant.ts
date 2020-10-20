import { uuid } from 'uuidv4'

class Restaurant {
	id: string;

	name: string;

	photo: string;

	address: string;

	regularHoursStart: Date;

	regularHoursEnd: Date;

	specialHoursStart: Date,

	specialHoursEnd: Date,

	constructor(
		name: string,
		photo: string,
		address: string,
		regularHoursStart: Date,
		regularHoursEnd: Date,
		specialHoursStart: Date,
		specialHoursEnd: Date
	){
		this.id = uuid();
		this.name = name;
		this.photo = photo;
		this.address = address;
		this.regularHoursStart = regularHoursStart;
		this.regularHoursEnd = regularHoursEnd;
		this.specialHoursStart = specialHoursStart;
		this.specialHoursEnd = specialHoursEnd;
	}
}

export default Restaurant;
