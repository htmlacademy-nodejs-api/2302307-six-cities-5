import {FileReader} from './file-reader.interface.js';
import {readFileSync} from 'node:fs';
import {City, Convenience, HousingType, Offer, UserType} from '../../types/index.js';


export class TSVFileReader implements FileReader {
  private rawData: string = '';

  constructor(
    private readonly filename: string
  ) {
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was nor read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([
        title, description, postDate, city, previewPicture, housingPictures,
        isPremium, isFavorite, rating, housingType, roomCount, guestCount,
        rentCost, conveniences, commentCount, coordinates, name, email,
        avatar, password, userType
      ]) => ({
        title,
        description,
        postDate: new Date(postDate),
        city: city as City,
        previewPicture,
        housingPictures: housingPictures.split(';')
          .map((picture) => picture),
        isPremium: isPremium.toLowerCase() === 'true',
        isFavorite: isFavorite.toLowerCase() === 'true',
        rating: parseFloat(rating),
        housingType: housingType as HousingType,
        roomCount: parseInt(roomCount, 10),
        guestCount: parseInt(guestCount, 10),
        rentCost: parseInt(rentCost, 10),
        conveniences: conveniences.split(';')
          .map((convenience) =>
            convenience as Convenience
          ),
        commentCount: parseInt(commentCount, 10),
        coordinates: {
          latitude: parseFloat(coordinates.split(';')[0]),
          longitude: parseFloat(coordinates.split(';')[1])
        },
        author: {
          name,
          email,
          avatar,
          password,
          userType: userType as UserType
        }
      }));
  }
}
