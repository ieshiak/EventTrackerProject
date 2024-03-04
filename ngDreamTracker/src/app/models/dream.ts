export class Dream {
  id: number;
  title: string;
  dreamer: string;
  description: string;
  date: string; // Separate date property
  time: string; // Separate time property
  type: string;
  emotion: string;

  constructor(
    id: number = 0,
    title: string = '',
    dreamer: string ='',
    description: string = '',
    date: string = '',
    time: string = '',
    type: string = '',
    emotion: string = '',
  ){
    this.id = id;
    this.title = title;
    this.dreamer = dreamer;
    this.description = description;
    this.date = date;
    this.time = time;
    this.type = type;
    this.emotion = emotion;
  }
}
export enum DreamType {
  Normal = 'Normal',
    Lucid = 'Lucid',
    Nightmare = 'Nightmare',
    Day = 'Day',
    Epic = 'Epic',
    Awakening = 'Awakening',
    Terror = 'Terror',
    Progressive = 'Progressive',
    Prophetic = 'Prophetic',
    Recurring = 'Recurring',
    Vivid = 'Vivid',
    Surreal = 'Surreal',
    Empowering = 'Empowering',
    Inspirational = 'Inspirational',
    Mystical = 'Mystical',
    Transformational = 'Transformational',
    Enlightening = 'Enlightening',
    Symbolic = 'Symbolic',
    Challenging = 'Challenging',
    Guiding = 'Guiding',
    Creative = 'Creative',
    Harmonious = 'Harmonious'
}

export enum DreamEmotion {
    Joy = 'Joy',
    Bliss = 'Bliss',
    Anger = 'Anger',
    Fear = 'Fear',
    Dread = 'Dread',
    Wonder = 'Wonder',
    Intrigue = 'Intrigue',
    Fascination = 'Fascination',
    Happiness = 'Happiness',
    Amazement = 'Amazement',
    Relaxation = 'Relaxation',
    Disorientation = 'Disorientation',
    Sadness = 'Sadness',
    Surprise = 'Surprise',
    Disgust = 'Disgust',
    Love = 'Love',
    Amusement = 'Amusement',
    Adventure = 'Adventure',
    Guilt = 'Guilt',
    Hope = 'Hope',
    Inspired = 'Inspired',
    Interested = 'Interested',
    Prideful = 'Prideful',
    Serenity = 'Serenity',
    Curious = 'Curious',
    Hate = 'Hate',
    Trust = 'Trust',
    Excitement = 'Excitement'
}

export enum ImgUrl {
  img_star1 = 'assets/images/IMG_STAR1.PNG',
  img_star2 = 'assets/images/IMG_STAR2.PNG',
  img_star3 = 'assets/images/IMG_STAR3.PNG',
  img_star4 = 'assets/images/IMG_STAR4.PNG',
  img_star5 = 'assets/images/IMG_STAR5.PNG',
  img_star6 = 'assets/images/IMG_STAR6.PNG',
  img_star7 = 'assets/images/IMG_STAR7.PNG',
  img_star8 = 'assets/images/IMG_STAR8.PNG',
  img_star9 = 'assets/images/IMG_STAR9.PNG',
  img_star10 = 'assets/images/IMG_STAR10.PNG',
  img_star11 = 'assets/images/IMG_STAR11.PNG',
  img_star12 = 'assets/images/IMG_STAR12.PNG',
  img_star13 = 'assets/images/IMG_STAR13.PNG',
  img_star14 = 'assets/images/IMG_STAR14.PNG',
  img_star15 = 'assets/images/IMG_STAR15.PNG',
  img_star16 = 'assets/images/IMG_STAR16.PNG',
  img_star17 = 'assets/images/IMG_STAR17.PNG',
  img_star18 = 'assets/images/IMG_STAR18.PNG',
  img_star19 = 'assets/images/IMG_STAR19.PNG',
  img_star20 = 'assets/images/IMG_STAR20.PNG',
  img_star21 = 'assets/images/IMG_STAR21.PNG',
  img_star22 = 'assets/images/IMG_STAR22.PNG'
}
