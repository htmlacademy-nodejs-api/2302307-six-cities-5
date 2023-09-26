import {HousingType} from './housing-type.enum.js';
import {City} from './city.enum.js';
import {Convenience} from './convenience.enum.js';
import {Coordinates} from './coordinates.type.js';
import {User} from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewPicture: string;
  housingPictures: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  roomCount: number;
  guestCount: number;
  price: number;
  conveniences: Convenience[];
  commentCount: number;
  coordinates: Coordinates
  author: User;
}
