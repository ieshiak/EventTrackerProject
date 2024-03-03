export class Dream {
  id: number;
  title: string;
  description: string;
  date: string; // Separate date property
  time: string; // Separate time property
  type: string;
  emotion: string;
  imgUrl: string;

  constructor(
    id: number = 0,
    title: string = '',
    description: string = '',
    date: string = '',
    time: string = '',
    type: string = '',
    emotion: string = '',
    imgUrl: string = ''
  ){
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.time = time;
    this.type = type;
    this.emotion = emotion;
    this.imgUrl = imgUrl;
  }
}
export enum DreamType {
  Lucid = 'Lucid',
  Nightmare = 'Nightmare',
  Prophetic = 'Prophetic',
  Recurring = 'Recurring'
}

export enum DreamEmotion {
  Fear = 'Fear',
  Joy = 'Joy',
  Sadness = 'Sadness',
  Excitement = 'Excitement'
}
