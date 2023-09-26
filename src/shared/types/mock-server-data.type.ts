import {Coordinates} from './coordinates.type.js';

type MockAuthorData = {
  names: string[],
  emails: string[],
  avatars: string[],
  passwords: string[],
};

export type MockServerData = {
  titles: string[],
  descriptions: string[],
  postDates: string[],
  cities: string[],
  previewPictures: string[],
  housingPictures: string[],
  housingTypes: string[],
  conveniences: string[],
  coordinates: Coordinates[],
  author: MockAuthorData
};
